import { goalCompletions, goals } from "../db/schema";
import dayjs from "dayjs";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";

interface CreateGoalCompletionRequest {
  goalId: string;
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf("week").toDate();
  const lastDayOfWeek = dayjs().endOf("week").toDate();

  const goalsCompletionCount = db.$with("goals_completion_count").as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as("completionCount"),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
      )
      .groupBy(goalCompletions.goalId)
  );

  const result = await db
    .with(goalsCompletionCount)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql/*sql*/ `
        COALESCE(${goalsCompletionCount.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(goalsCompletionCount, eq(goalsCompletionCount.goalId, goals.id))
    .where(eq(goals.id, goalId));

  const { desiredWeeklyFrequency, completionCount } = result[0];

  if (completionCount >= desiredWeeklyFrequency) {
    throw new Error("Goal already completed for the week");
  }

  const insertResult = await db.insert(goalCompletions).values({ goalId });
  const goalCompletion = insertResult[0];

  return {
    goalCompletion,
  };
}
