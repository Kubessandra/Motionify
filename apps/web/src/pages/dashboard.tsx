import { ReactElement } from "react";
import Layout from "~/components/Layout";
import { useSession } from "~/hooks/useSession";
import VideoListing from "~/components/VideoListing";

const Dashboard = () => {
  const session = useSession(true);
  if (!session) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Welcome to the dashboard</h1>
      <VideoListing />
    </div>
  );
};

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Dashboard;
