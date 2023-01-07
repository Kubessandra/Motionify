import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TemplatePreview } from "../components/templates/TemplatePreview";
import { previews } from "../components/templates/data";

export default {
  title: "Example/TemplatePreview",
  component: TemplatePreview,
} as ComponentMeta<typeof TemplatePreview>;

const Template: ComponentStory<typeof TemplatePreview> = (args) => (
  <div className="w-2/3">
    <TemplatePreview {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  preview: previews[0],
  name: "test",
  onDownloadClick: () => undefined,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  preview: previews[0],
  name: "isLoading",
  onDownloadClick: () => undefined,
  loading: true,
};
