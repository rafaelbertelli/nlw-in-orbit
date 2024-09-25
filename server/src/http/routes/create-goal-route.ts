import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoal } from "../../functions/create-goal";
import type { FastifyRequest } from "fastify";

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
  const path = "/goals";

  const schema = {
    body: z.object({
      title: z.string(),
      desiredWeeklyFrequency: z.number(),
    }),
  };

  type RequestType = FastifyRequest<{ Body: z.infer<typeof schema.body> }>;
  const execute = async (req: RequestType) => {
    const body = req.body;

    await createGoal({
      title: body.title,
      desiredWeeklyFrequency: body.desiredWeeklyFrequency,
    });
  };

  app.post(path, { schema: schema }, execute);
};
