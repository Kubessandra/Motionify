import { ReactElement } from "react";
import Layout from "~/components/Layout";
import { useSession } from "~/hooks/useSession";
import { TemplateListing } from "~/components/templates/TemplateListing";

const Dashboard = () => {
  const session = useSession(true);
  if (!session) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Welcome to the dashboard</h1>
      <TemplateListing />
    </div>
  );
};

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Dashboard;
