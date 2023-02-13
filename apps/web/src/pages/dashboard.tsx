import saveAs from "file-saver";
import { ReactElement } from "react";
import Layout from "~/components/Layout";
import { TemplateListing } from "~/components/templates/TemplateListing";
import { TemplatePreview } from "~/components/templates/TemplatePreview";
import { trpc } from "~/utils/trpc";
import { previews } from "~/components/templates/data";

const Dashboard = () => {
  const { data: nbCommits } = trpc.github.numberOfCommit.useQuery({
    repo: "Motionify",
    owner: "Kubessandra",
    timing: "month",
  });

  const computeVideoMutation = trpc.video.computeVideo.useMutation();
  const inputProps = {
    commitNumber: nbCommits,
    timing: "month",
  };

  const download = async (templateId: string) => {
    const videoUrl = await computeVideoMutation.mutateAsync({
      templateId: templateId,
      inputProps: inputProps,
    });
    saveAs(videoUrl, `${templateId}.mp4`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Welcome to the dashboard</h1>
      <TemplatePreview
        inputProps={inputProps}
        onDownloadClick={download}
        loading={computeVideoMutation.isLoading}
        preview={previews[0]}
      />
      <TemplateListing />
    </div>
  );
};

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Dashboard;
