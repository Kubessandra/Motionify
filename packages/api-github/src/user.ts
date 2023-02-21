import { Octokit } from "octokit";

interface GithubUser {
  id: number;
  login: string;
  name: string | null;
  company: string | null;
}

export const getUser = async (ghToken: string): Promise<GithubUser> => {
  const octokit = new Octokit({
    auth: ghToken,
  });

  const {
    data: { id, company, login, name },
  } = await octokit.rest.users.getAuthenticated();

  return {
    id,
    login,
    company,
    name,
  };
};

export interface GithubRepository {
  id: string;
  name: string;
  owner: string;
}

export const getUserRepositories = async (
  ghToken: string
): Promise<GithubRepository[]> => {
  const octokit = new Octokit({
    auth: ghToken,
  });

  const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser();
  const finalRepos = repos.map((repo) => ({
    id: repo.id.toString(),
    name: repo.name,
    owner: repo.owner.login,
  }));
  return finalRepos;
};
