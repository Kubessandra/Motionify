import { ReactElement } from "react";
import Layout from "~/components/Layout";
import { useSession } from "~/hooks/useSession";
import { TemplateListing } from "~/components/templates/TemplateListing";
import { trpc } from "~/utils/trpc";

const Dashboard = () => {
  const session = useSession(true);
  if (!session) return null;

  const { data, isLoading } = trpc.github.user.useQuery();

  return (
    <div>
      <h1>{data?.id}</h1>
      <h1>{data?.login}</h1>
      <h2>{String(isLoading)}</h2>
      <h1 className="text-2xl font-bold my-8">Welcome to the dashboard</h1>
      <TemplateListing />
    </div>
  );
};

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Dashboard;
