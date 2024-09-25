import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../../functions/get-week-pending-goals";

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
  const path = "/pending-goals";

  const execute = async () => {
    const result = await getWeekPendingGoals();
    return result;
  };

  app.get(path, execute);
};
