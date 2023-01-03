import { RemotionPlayer, templates } from "@kubessandra/remotion";
import { useState } from "react";
import { useSession } from "~/hooks/useSession";
import { trpc } from "~/utils/trpc";
import {
  ArrowDownTrayIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";
import Loading from "./Loading";
import saveAs from "file-saver";
import { BoltIcon } from "@heroicons/react/20/solid";

const previews = [
  {
    id: "1",
    name: "WelcomeTemplateDefault",
    template: templates.Welcome,
    href: "#",
    color: "#111827",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
  },
  {
    id: "2",
    templateId: "Welcome",
    template: templates.Welcome,
    name: "WelcomeTemplateBrass",
    href: "#",
    color: "#FDE68A",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
  },
] as const;

export default function VideoListing() {
  const session = useSession(false);

  if (!session) return <Loading />;

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Trending products
          </h2>
        </div>

        <div className="relative mt-8">
          <div className="relative -mb-6 w-full overflow-x-auto pb-6">
            <ul
              role="list"
              className="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-x-0"
            >
              {previews.map((preview) => (
                <li
                  key={preview.id}
                  className="inline-flex w-96 flex-col text-center lg:w-auto"
                >
                  <PreviewTemplate preview={preview} name={session.email} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PreviewTemplateProps {
  preview: typeof previews[number];
  name: string;
}

const PreviewTemplate = (props: PreviewTemplateProps) => {
  const { preview, name } = props;
  const [color, setColor] = useState<string>(preview.color);

  const renderVideoMutation = trpc.video.computeVideo.useMutation();

  return (
    <>
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-200">
          <RemotionPlayer
            style={{ width: "100%" }}
            inputProps={{
              name,
              color,
            }}
            component={preview.template}
            durationInFrames={120}
            fps={30}
            compositionWidth={1280}
            compositionHeight={720}
            controls
          />
        </div>
        <button
          disabled={renderVideoMutation.isLoading}
          onClick={async () => {
            const videoUrl = await renderVideoMutation.mutateAsync({
              templateId: preview.template.templateId,
              inputProps: {
                name,
                color,
              },
            });
            saveAs(videoUrl, "video.mp4");
          }}
          className="absolute right-2 top-2  bg-gray-200 rounded-xl p-2 disabled:cursor-progress"
        >
          {renderVideoMutation.isLoading ? (
            <BoltIcon className="w-6 h-6 animate-spin" />
          ) : (
            <ArrowDownTrayIcon className="w-6 h-6" />
          )}
        </button>
        <div className="mt-6">
          <p className="text-sm text-gray-500">{color}</p>
          <h3 className="mt-1 font-semibold text-gray-900">
            <a href={preview.href}>{preview.name}</a>
          </h3>
        </div>
      </div>

      <h4 className="sr-only">Available colors</h4>
      <ul
        role="list"
        className="mt-auto flex items-center justify-center space-x-3 pt-6"
      >
        {preview.availableColors.map((color) => (
          <li
            key={color.name}
            className="h-4 w-4 rounded-full border border-black border-opacity-10"
            style={{ backgroundColor: color.colorBg }}
            onClick={() => setColor(color.colorBg)}
          >
            <span className="sr-only"> {color.name} </span>
          </li>
        ))}
      </ul>
    </>
  );
};
