import { getAppOctokit } from "../initApp";

type Timing = "week" | "month" | "year";

interface NumberOfCommitOpts {
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
  timing,
  owner,
  repo,
}: NumberOfCommitOpts) => {
  const octokit = getAppOctokit();
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
