import {
  getNumberOfCommit,
  getUser,
  getUserRepositories,
  type GithubRepository,
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
      const { owner, repo, timing } = input;
      const ghToken = await ctx.session.getProviderAccessToken("github");
      const nbCommits = await getNumberOfCommit({
        token: ghToken,
        owner,
        repo,
        timing,
      });
      return nbCommits;
    }),
  listRepositories: authProcedure
    .input(
      z.object({
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }): Promise<GithubRepository[]> => {
      const { search } = input;
      const ghToken = await ctx.session.getProviderAccessToken("github");
      const repos = await getUserRepositories(ghToken, { search });
      return repos;
    }),
  user: authProcedure.query(async ({ ctx }) => {
    const token = await ctx.session.getProviderAccessToken("github");
    const user = await getUser(token);
    return user;
  }),
});
