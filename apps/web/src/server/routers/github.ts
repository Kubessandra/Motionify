import { getUser, refreshAccessToken, initApp } from "@kubessandra/api-github";
import { router } from "../trpc";
import { computeVideo } from "@kubessandra/remotion/src/server/computeVideo";
import { z } from "zod";

import { authProcedure } from "../auth/middleware";
import { env } from "../env";

initApp({
  appId: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_PRIVATE_KEY,
});

export const githubRouter = router({
  numberOfCommit: authProcedure
    .input(
      z.object({
        templateId: z.string().max(250),
        inputProps: z.record(z.any()),
      })
    )
    .mutation(async ({ input }) => {
      const { templateId, inputProps } = input;
      const outputUrl = await computeVideo({
        templateId,
        inputProps: inputProps,
      });
      return outputUrl;
    }),

  user: authProcedure.query(async ({ ctx }) => {
    const token = await ctx.session.getProviderAccessToken("github");
    console.log('TOK', token);
    // const newToken = await refreshAccessToken(token);
    const user = await getUser(token);
    return user;
  }),
});
