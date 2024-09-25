import fastify from "fastify";
import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createCompletionsRoute } from "./routes/create-completions-route";
import { createGoalRoute } from "./routes/create-goal-route";
import { getPendingGoalsRoute } from "./routes/get-pending-goals-route";
import { getWeekSummaryRoute } from "./routes/get-week-summary-route";
import fastifyCors from "@fastify/cors";

// Initialize Fastify app (Server)
const app = fastify().withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Register CORS
app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

// Register routes
app.register(getPendingGoalsRoute);
app.register(createGoalRoute);
app.register(createCompletionsRoute);
app.register(getWeekSummaryRoute);

// Start the server
app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
