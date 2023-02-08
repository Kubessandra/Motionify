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
  } = await octokit.request("GET /user", {});
  return {
    id,
    login,
    company,
    name,
  };
};
