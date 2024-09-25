import { db } from "../..";
import { goals } from "../../schema";

interface createGoalQueryArgs {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoalQuery({
  title,
  desiredWeeklyFrequency,
}: createGoalQueryArgs) {
  const result = await db
    .insert(goals)
    .values({ title, desiredWeeklyFrequency })
    .returning();

  return result[0];
}
