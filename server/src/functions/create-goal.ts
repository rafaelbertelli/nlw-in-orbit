import { createGoalQuery } from "../db/queries/create-goal/query";

interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const goal = await createGoalQuery({ title, desiredWeeklyFrequency });

  return {
    goal,
  };
}
