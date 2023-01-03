import { ReactElement, useState } from "react";
import Layout from "~/components/Layout";
import { useSession } from "~/hooks/useSession";
import VideoListing from "~/components/VideoListing";

const Dashboard = () => {
  const [value, setValue] = useState("");
  const session = useSession(true);
  if (!session) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Welcome to the dashboard</h1>
      <VideoListing />
      <div className="flex flex-col items-center space-y-4 m-8">
        <input
          className="border border-indigo-200"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Dashboard;
