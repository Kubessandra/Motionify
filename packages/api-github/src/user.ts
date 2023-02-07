import { Octokit } from "octokit";
import { getAppOctokit } from "./initApp";

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

interface RefreshTokenResponse {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: string;
  scope: string;
  token_type: string;
}

export const refreshAccessToken = async (
  ghRefreshToken: string
): Promise<string> => {
  const octokit = getAppOctokit();
  const response = await octokit.request("POST /login/oauth/access_token", {
    refresh_token: ghRefreshToken,
    grant_type: "refresh_token",
  });
  const tokenResponse = response.data as RefreshTokenResponse;
  return tokenResponse.access_token;
};
