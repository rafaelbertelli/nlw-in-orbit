import type { FastifyRequest } from "fastify";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createGoalCompletion } from "../../functions/create-goal-completion";

export const createCompletionsRoute: FastifyPluginAsyncZod = async (app) => {
  const path = "/completions";

  const schema = {
    body: z.object({
      goalId: z.string(),
    }),
  };

  type RequestType = FastifyRequest<{ Body: z.infer<typeof schema.body> }>;
  const execute = async (req: RequestType) => {
    const body = req.body;

    await createGoalCompletion({
      goalId: body.goalId,
    });
  };

  app.post(path, { schema: schema }, execute);
};
