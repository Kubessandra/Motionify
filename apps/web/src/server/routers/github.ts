import {
  getNumberOfCommit,
  getUser,
  getUserRepositories,
  GithubRepository,
  timingValues,
} from "@kubessandra/api-github";
import { router } from "../trpc";
import { z } from "zod";

import { authProcedure } from "../auth/middleware";
import { Repository } from "~/components/templates/TemplateGithub/RepoSelector";

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
  listRepositories: authProcedure.query(
    async ({ ctx }): Promise<GithubRepository[]> => {
      const ghToken = await ctx.session.getProviderAccessToken("github");
      const repos = await getUserRepositories(ghToken);
      return repos;
    }
  ),
  user: authProcedure.query(async ({ ctx }) => {
    const token = await ctx.session.getProviderAccessToken("github");
    const user = await getUser(token);
    return user;
  }),
});
