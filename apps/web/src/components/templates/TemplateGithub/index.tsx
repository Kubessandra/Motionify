import { GithubRepository } from "@kubessandra/api-github";
import { RemotionPlayer, templates } from "@kubessandra/remotion";
import { useEffect, useState } from "react";
import { trpc } from "~/utils/trpc";
import { RepoSelector, Repository } from "./RepoSelector";

interface RepoSelectorWithFetchProps {
  onChange: (data: GithubRepository) => void;
}

export const RepoSelectorWithFetch = (props: RepoSelectorWithFetchProps) => {
  const { onChange } = props;
  const { data: repos, isLoading } = trpc.github.listRepositories.useQuery();

  const [selectedRepo, setSelectedRepo] = useState<Repository | undefined>();

  const firstRepo = repos?.[0];
  useEffect(() => {
    setSelectedRepo(firstRepo);
  }, [firstRepo]);

  useEffect(() => {
    if (!selectedRepo) return;
    onChange(selectedRepo);
  }, [selectedRepo, onChange]);

  if (isLoading) return <div>Loading...</div>;
  if (!repos) {
    return <div>No repos</div>;
  }

  return (
    <div>
      {selectedRepo && (
        <RepoSelector
          repos={repos}
          onChange={setSelectedRepo}
          selectedRepo={selectedRepo}
        />
      )}
    </div>
  );
};

interface TestY {
  owner: string;
  repo: string;
}

const TestY = (props: TestY) => {
  const { owner, repo } = props;

  const timing = "year";
  const { data: nbCommit, isLoading } = trpc.github.numberOfCommit.useQuery({
    owner,
    repo,
    timing,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!nbCommit) return <div>No number of commit available</div>;

  return (
    <RemotionPlayer
      inputProps={{
        timing,
        commitNumber: nbCommit,
      }}
      style={{ width: "100%" }}
      component={templates.Github}
      durationInFrames={120}
      fps={30}
      compositionWidth={1280}
      compositionHeight={720}
      controls
    />
  );
};

export const TemplateGithub = () => {
  const [repo, setRepo] = useState<GithubRepository | null>(null);

  return (
    <div>
      <div className="bg-gray-50 rounded-md p-8 m-2 space-y-4">
        <RepoSelectorWithFetch onChange={setRepo} />
      </div>
      <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-200 z-0">
        {repo ? (
          <TestY owner={repo.owner} repo={repo.name} />
        ) : (
          <div>Select a repo please</div>
        )}
      </div>
    </div>
  );
};
