/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from "../trpc";
import { paymentRouter } from "./payment";
import { videoRouter } from "./video";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),
  payment: paymentRouter,
  video: videoRouter,
});

export type AppRouter = typeof appRouter;
