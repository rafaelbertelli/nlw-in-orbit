import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekSummary } from "../../functions/get-week-summary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
  const path = "/summary";

  const execute = async () => {
    const result = await getWeekSummary();
    return result;
  };

  app.get(path, execute);
};
