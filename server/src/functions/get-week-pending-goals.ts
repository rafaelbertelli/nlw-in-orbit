import { pendingGoalsQuery } from "../db/queries/pending-goals/query";
import { goalsCompletionCountSubQuery } from "../db/subqueries/goals-completion-count/subquery";
import { goalsCreatedUpToWeekSubQuery } from "../db/subqueries/goals-created-up-to-week/subquery";

export async function getWeekPendingGoals() {
  const goalsCreatedUpToWeek = goalsCreatedUpToWeekSubQuery();
  const goalsCompletionCount = goalsCompletionCountSubQuery();
  const pendingGoals = await pendingGoalsQuery({
    goalsCreatedUpToWeek,
    goalsCompletionCount,
  });

  return {
    pendingGoals,
  };
}
