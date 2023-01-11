import { getOctokit } from "../init";

type Timing = "week" | "month";

interface NumberOfCommitOpts {
  owner: string;
  repo: string;
  timing: "week" | "month";
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
  }
  return commitNumber;
};

export const numberOfCommit = async ({
  timing,
  owner,
  repo,
}: NumberOfCommitOpts) => {
  const octokit = getOctokit();
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
