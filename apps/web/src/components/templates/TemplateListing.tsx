import { useSession } from "~/hooks/useSession";
import Loading from "../Loading";
import { TemplatePreview } from "./TemplatePreview";
import { previews } from "./data";
import { trpc } from "~/utils/trpc";
import saveAs from "file-saver";

export const TemplateListing = () => {
  const session = useSession(false);
  const computeVideoMutation = trpc.video.computeVideo.useMutation();

  const download = async (templateId: string, name: string, color: string) => {
    const videoUrl = await computeVideoMutation.mutateAsync({
      templateId: templateId,
      inputProps: {
        name,
        color,
      },
    });
    saveAs(videoUrl, `${templateId}.mp4`);
  };
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
                  <TemplatePreview
                    onDownloadClick={download}
                    loading={computeVideoMutation.isLoading}
                    preview={preview}
                    name={session.email}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
