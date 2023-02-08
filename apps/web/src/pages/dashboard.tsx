import { UserButton, useUser } from "@clerk/nextjs";
import { ReactElement } from "react";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import { TemplateListing } from "~/components/templates/TemplateListing";
import { trpc } from "~/utils/trpc";

const Dashboard = () => {
  const { user, isLoaded } = useUser();

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
