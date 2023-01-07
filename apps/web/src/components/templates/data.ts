import { templates } from "@kubessandra/remotion";

export const previews = [
  {
    id: "1",
    name: "WelcomeTemplateDefault",
    template: templates.Welcome,
    color: "#111827",
  },
  {
    id: "2",
    templateId: "Welcome",
    template: templates.Welcome,
    name: "WelcomeTemplateBrass",
    color: "#FDE68A",
  },
] as const;
