import {
  getNumberOfCommit,
  getUser,
  timingValues,
} from "@kubessandra/api-github";
import { router } from "../trpc";
import { z } from "zod";

import { authProcedure } from "../auth/middleware";

export const githubRouter = router({
  numberOfCommit: authProcedure
    .input(
      z.object({
        timing: z.enum(timingValues),
        owner: z.string(),
        repo: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const timing = input.timing;
      const ghToken = await ctx.session.getProviderAccessToken("github");
      const nbCommits = await getNumberOfCommit({
        token: ghToken,
        owner: "Kubessandra",
        repo: "Motionify",
        timing,
      });
      return nbCommits;
    }),

  user: authProcedure.query(async ({ ctx }) => {
    const token = await ctx.session.getProviderAccessToken("github");
    const user = await getUser(token);
    return user;
  }),
});
