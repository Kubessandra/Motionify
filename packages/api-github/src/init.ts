import { Octokit } from "octokit";

interface AuthCreds {
  appId: string;
  privateKey: string;
}

export const init = (authCreds: AuthCreds) => {
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
export const getOctokit = (): Octokit => {
  if (!_octokit) throw new Error("No octokit available");
  return _octokit;
};
