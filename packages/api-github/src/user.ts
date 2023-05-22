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

interface GetUserRepositoriesParams {
  search?: string;
}

type TypeWithNonNullableOwner<Type extends { [key: string]: unknown }> =
  Type & { owner: NonNullable<Type["owner"]> };

//(typeof result.items)[number] & { owner: { login: string } }

export const getUserRepositories = async (
  ghToken: string,
  params: GetUserRepositoriesParams = {}
): Promise<GithubRepository[]> => {
  const { search = "" } = params;
  const octokit = new Octokit({
    auth: ghToken,
  });

  const { login } = await getUser(ghToken);

  const { data: result } = await octokit.rest.search.repos({
    q: `user:${login} ${search}`,
    per_page: 30,
  });
  const repos = result.items.filter(
    (repo): repo is TypeWithNonNullableOwner<(typeof result.items)[number]> =>
      !!repo.owner
  );
  const finalRepos = repos.map((repo) => ({
    id: repo.id.toString(),
    name: repo.name,
    owner: repo.owner.login,
  }));
  return finalRepos;
};
