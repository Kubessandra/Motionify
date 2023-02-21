import { ReactElement } from "react";
import Layout from "~/components/Layout";
import { TemplateGithub } from "~/components/templates/TemplateGithub";

const Editor = () => {
  return (
    <div>
      <TemplateGithub />
    </div>
  );
};

Editor.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Editor;
