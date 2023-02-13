import { Octokit } from "octokit";

export const timingValues = ["week", "month", "year"] as const;
export type Timing = (typeof timingValues)[number];

interface NumberOfCommitOpts {
  token: string;
  owner: string;
  repo: string;
  timing: Timing;
}

export const transfromGithubDataToTiming = (
  data: { owner: number[] },
  timing: Timing
) => {
  let commitNumber: number;
  switch (timing) {
    case "month":
      const lastMonth = data.owner.slice(-4);
      commitNumber = lastMonth.reduce((nb, current) => nb + current, 0);
      break;
    case "week":
      const lastWeek = data.owner.slice(-1);
      commitNumber = lastWeek[0];
      break;
    case "year":
      commitNumber = data.owner.reduce((nb, current) => nb + current, 0);
      break;
  }
  return commitNumber;
};

export const getNumberOfCommit = async ({
  token,
  timing,
  owner,
  repo,
}: NumberOfCommitOpts) => {
  const octokit = new Octokit({
    auth: token,
  });
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/stats/participation",
    {
      owner,
      repo,
    }
  );
  const commitNumber = transfromGithubDataToTiming(data, timing);
  return commitNumber;
};
