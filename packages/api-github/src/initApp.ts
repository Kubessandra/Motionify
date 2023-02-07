import { Octokit } from "octokit";

/*
 ** Octokit use for authentication with appId
 ** and private Key
 */

interface AuthCreds {
  appId: string;
  privateKey: string;
}

export const initApp = (authCreds: AuthCreds) => {
  _authCreds = authCreds;
  _octokit = new Octokit({
    appId: _authCreds.appId,
    privateKey: _authCreds.privateKey,
  });
};

let _authCreds: AuthCreds;
export const getAuthCreds = () => {
  if (!_authCreds) throw new Error("No token available");
  return _authCreds;
};

let _octokit: Octokit;
export const getAppOctokit = (): Octokit => {
  if (!_octokit) throw new Error("No octokit available");
  return _octokit;
};
