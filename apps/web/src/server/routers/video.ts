import { router } from "../trpc";
import { computeVideo } from "@kubessandra/remotion/src/server/computeVideo";
import { z } from "zod";

import { authProcedure } from "../auth/middleware";

export const videoRouter = router({
  computeVideo: authProcedure
    .input(
      z.object({
        videoId: z.string().max(250),
        inputProps: z.record(z.any()),
      })
    )
    .mutation(async ({ input }) => {
      const { videoId, inputProps } = input;
      const outputUrl = await computeVideo({
        videoId,
        inputProps: inputProps,
      });
      return outputUrl;
    }),
});
