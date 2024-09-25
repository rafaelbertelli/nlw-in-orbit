import { eq, sql } from "drizzle-orm";
import type { goalsCreatedUpToWeekSubQuery } from "../../subqueries/goals-created-up-to-week/subquery";
import type { goalsCompletionCountSubQuery } from "../../subqueries/goals-completion-count/subquery";
import { db } from "../..";

interface PendingGoalsQuery {
  goalsCreatedUpToWeek: ReturnType<typeof goalsCreatedUpToWeekSubQuery>;
  goalsCompletionCount: ReturnType<typeof goalsCompletionCountSubQuery>;
}

export async function pendingGoalsQuery({
  goalsCreatedUpToWeek,
  goalsCompletionCount,
}: PendingGoalsQuery) {
  return await db
    .with(goalsCreatedUpToWeek, goalsCompletionCount)
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
      completionCount: sql/*sql*/ `
        COALESCE(${goalsCompletionCount.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(
      goalsCompletionCount,
      eq(goalsCompletionCount.goalId, goalsCreatedUpToWeek.id)
    );
}
