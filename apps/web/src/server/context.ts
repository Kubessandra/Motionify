/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { ISession } from "./auth/types";
import { prisma } from "./prisma";
import { createPaymentAccount, createUser } from "./core/user";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { getSession } from "./auth/getSession";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  session: ISession | null;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  const externalId = _opts.session?.externalId;
  const email = _opts.session?.email;
  if (externalId && email) {
    let userInfo = await prisma.userInfo.findUnique({
      where: { externalId },
      include: { paymentInfo: true },
    });
    if (!userInfo) {
      userInfo = await createUser({ externalId, email });
    }
    if (!userInfo.paymentInfo) {
      userInfo = await createPaymentAccount({ userId: userInfo.id, email });
    }
    return { session: _opts.session, user: userInfo };
  }
  return { session: null, user: null };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching
  const session = await getSession(opts.req);
  return await createContextInner({ session });
}
