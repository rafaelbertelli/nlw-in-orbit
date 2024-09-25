import dayjs from "dayjs";
import { lte } from "drizzle-orm";
import { db } from "../..";
import { goals } from "../../schema";

export function goalsCreatedUpToWeekSubQuery() {
  const lastDayOfWeek = dayjs().endOf("week").toDate();

  return db.$with("goals_created_up_to_week").as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  );
}
