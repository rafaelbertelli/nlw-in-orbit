import { getWeekSummaryQuery } from "../db/queries/get-week-summary/query";
import { goalsCompletedByWeekDaySubQuery } from "../db/subqueries/goals-completed-by-week-day/subquery";
import { goalsCompletedInWeekSubQuery } from "../db/subqueries/goals-completed-in-week/subquery";
import { goalsCreatedUpToWeekSubQuery } from "../db/subqueries/goals-created-up-to-week/subquery";

export async function getWeekSummary() {
  const goalsCreatedUpToWeek = goalsCreatedUpToWeekSubQuery();
  const goalsCompletedInWeek = goalsCompletedInWeekSubQuery();
  const goalsCompletedByWeekDay = goalsCompletedByWeekDaySubQuery({
    goalsCompletedInWeek,
  });

  const summary = await getWeekSummaryQuery({
    goalsCreatedUpToWeek,
    goalsCompletedInWeek,
    goalsCompletedByWeekDay,
  });

  return {
    summary,
  };
}
