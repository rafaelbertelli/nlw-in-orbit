import { db } from "../..";
import type { goalsCompletedByWeekDaySubQuery } from "../../subqueries/goals-completed-by-week-day/subquery";
import type { goalsCompletedInWeekSubQuery } from "../../subqueries/goals-completed-in-week/subquery";
import type { goalsCreatedUpToWeekSubQuery } from "../../subqueries/goals-created-up-to-week/subquery";
import { sql } from "drizzle-orm";

interface GetWeekSummaryQueryArgs {
  goalsCreatedUpToWeek: ReturnType<typeof goalsCreatedUpToWeekSubQuery>;
  goalsCompletedInWeek: ReturnType<typeof goalsCompletedInWeekSubQuery>;
  goalsCompletedByWeekDay: ReturnType<typeof goalsCompletedByWeekDaySubQuery>;
}

export async function getWeekSummaryQuery({
  goalsCreatedUpToWeek,
  goalsCompletedInWeek,
  goalsCompletedByWeekDay,
}: GetWeekSummaryQueryArgs) {
  const result = await db
    .with(goalsCreatedUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
    .select({
      completed:
        sql/*sql*/ `(SELECT COUNT(*) FROM goals_completed_in_week)`.mapWith(
          Number
        ),
      total:
        sql/*sql*/ `(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM goals_created_up_to_week)`.mapWith(
          Number
        ),
      goalsPerDay: sql/*sql*/ `(
        JSON_OBJECT_AGG(
          ${goalsCompletedByWeekDay.completedAtDate},
          ${goalsCompletedByWeekDay.completions}
        )
      )`,
    })
    .from(goalsCompletedByWeekDay);

  return result[0];
}
