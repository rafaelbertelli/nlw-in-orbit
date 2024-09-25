import { sql } from "drizzle-orm";
import type { goalsCompletedInWeekSubQuery } from "../goals-completed-in-week/subquery";
import { db } from "../..";

interface GoalsCompletedByWeekDaySubQueryArgs {
  goalsCompletedInWeek: ReturnType<typeof goalsCompletedInWeekSubQuery>;
}

export function goalsCompletedByWeekDaySubQuery({
  goalsCompletedInWeek,
}: GoalsCompletedByWeekDaySubQueryArgs) {
  return db.$with("goals_completed_by_week_day").as(
    db
      .select({
        completedAtDate: goalsCompletedInWeek.completedAtDate,
        completions: sql/*sql*/ `
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', ${goalsCompletedInWeek.id},
            'title', ${goalsCompletedInWeek.title},
            'completedAt', ${goalsCompletedInWeek.completedAt}
          )
        )
      `.as("completions"),
      })
      .from(goalsCompletedInWeek)
      .groupBy(goalsCompletedInWeek.completedAtDate)
  );
}
