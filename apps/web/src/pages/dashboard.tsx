import Link from "next/link";
import RemotionPlayer from "@kubessandra/remotion/src/RemotionPlayer";
import { Welcome } from "@kubessandra/remotion/src/videos/Welcome";
import { ReactElement, useState } from "react";
import { saveAs } from "file-saver";
import Layout from "~/components/Layout";
import { useSession } from "~/hooks/useSession";
import auth from "~/utils/auth";
import { trpc } from "~/utils/trpc";

const Dashboard = () => {
  const [value, setValue] = useState("");
  const renderVideoMutation = trpc.video.computeVideo.useMutation();
  const session = useSession(true);
  if (!session) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Welcome to the dashboard</h1>
      <h2 className="my-4">{session.email}</h2>
      <div className="flex flex-col items-center space-y-4 m-8">
        <Link
          className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
          href={auth.logoutURL}
        >
          Logout
        </Link>
        <input
          className="border border-indigo-200"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button
          onClick={async () => {
            const videoUrl = await renderVideoMutation.mutateAsync({
              videoId: Welcome.videoId,
              inputProps: {
                name: value,
              },
            });
            saveAs(videoUrl, "video.mp4");
          }}
          className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
        >
          Download
        </button>
        <RemotionPlayer
          style={{ width: "100%" }}
          inputProps={{
            name: value,
          }}
          component={Welcome}
          durationInFrames={120}
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          controls
        />
      </div>
    </div>
  );
};

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Dashboard;
