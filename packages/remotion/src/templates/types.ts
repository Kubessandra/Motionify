import * as templates from "./index";

export const templateList = Object.values(templates);

type KeyOfTemplate = keyof typeof templates;

export type TemplateIdPropsMap = {
  [K in KeyOfTemplate as (typeof templates)[K]["templateId"]]: Parameters<
    (typeof templates)[K]
  >[0];
};

export type Template = (typeof templateList)[number];
