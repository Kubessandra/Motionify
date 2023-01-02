import {
  getFunctions,
  renderMediaOnLambda,
  getRenderProgress,
} from "@remotion/lambda";

const serveUrl =
  "https://remotionlambda-useast1-lzq62ife7f.s3.us-east-1.amazonaws.com/sites/remotion/index.html";

interface RenderVideoProps {
  inputProps: object;
  videoId: string;
}

let functionName: string | null | undefined = null;
const getFunctionName = async () => {
  if (!functionName) {
    const functions = await getFunctions({
      region: "us-east-1",
      compatibleOnly: true,
    }).catch((e) => console.error(e));
    functionName = functions?.[0].functionName;
    if (!functionName) throw new Error("No function name");
  }
  return functionName;
};

export const computeVideo = async (
  props: RenderVideoProps
): Promise<string> => {
  const { inputProps, videoId } = props;
  const { renderId, bucketName } = await renderMediaOnLambda({
    region: "us-east-1",
    functionName: await getFunctionName(),
    inputProps,
    serveUrl,
    composition: videoId,
    codec: "h264",
    downloadBehavior: {
      type: "download",
      fileName: null,
    },
    imageFormat: "jpeg",
    maxRetries: 1,
    framesPerLambda: 20,
    privacy: "public",
  });

  const outputfileUrl = await waitForRenderingProcess(renderId, bucketName);
  return outputfileUrl;
};

const waitForRenderingProcess = (renderId: string, bucketName: string) =>
  new Promise<string>(async (resolve, rej) => {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const progress = await getRenderProgress({
        renderId,
        bucketName,
        functionName: await getFunctionName(),
        region: "us-east-1",
      });
      if (progress.done) {
        console.log("Render finished!", progress.outputFile);
        if (!progress.outputFile) return rej("Done, but no outputFile");
        return resolve(progress.outputFile);
      }
      if (progress.fatalErrorEncountered) {
        console.error("Error enountered", progress.errors);
        return rej(JSON.stringify(progress.errors));
      }
    }
  });
