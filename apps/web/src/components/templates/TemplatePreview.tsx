import { RemotionPlayer } from "@kubessandra/remotion";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { BoltIcon } from "@heroicons/react/20/solid";
import { previews } from "./data";

interface PreviewTemplateProps {
  preview: typeof previews[number];
  loading: boolean;
  onDownloadClick: (templateId: string, name: string, color: string) => void;
  name: string;
}

export const TemplatePreview = (props: PreviewTemplateProps) => {
  const { preview, name, onDownloadClick, loading } = props;
  return (
    <>
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-200">
          <RemotionPlayer
            style={{ width: "100%" }}
            inputProps={{
              name,
              color: preview.color,
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
          disabled={loading}
          onClick={() =>
            onDownloadClick(preview.template.templateId, name, preview.color)
          }
          className="absolute right-2 top-2  bg-gray-200 rounded-xl p-2 disabled:cursor-progress"
        >
          {loading ? (
            <BoltIcon className="w-6 h-6 animate-spin" />
          ) : (
            <ArrowDownTrayIcon className="w-6 h-6" />
          )}
        </button>
        <div className="mt-6">
          <p className="text-sm text-gray-500">{preview.color}</p>
          <h3 className="mt-1 font-semibold text-gray-900">
            <h2>{preview.name}</h2>
          </h3>
        </div>
      </div>
    </>
  );
};
