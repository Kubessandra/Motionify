import { clerkClient, getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest } from "next";
import type { ISession, ProviderType } from "./types";

const clerkProviders = {
  google: "oauth_google",
  github: "oauth_github",
} as const;

interface ClerkSessionArgs {
  externalId: string;
  email: string;
}

class ClerkSession implements ISession {
  externalId: string;
  email: string;

  constructor({ externalId, email }: ClerkSessionArgs) {
    this.externalId = externalId;
    this.email = email;
  }

  getClerkProvider = (provider: ProviderType) => clerkProviders[provider];

  getProviderAccessToken = async (provider: ProviderType): Promise<string> => {
    const clerkProvider = this.getClerkProvider(provider);
    const [responseToken] = await clerkClient.users.getUserOauthAccessToken(
      this.externalId,
      clerkProvider
    );
    if (!responseToken)
      throw new Error(
        `[Clerk] No access token for the provider: ${provider}, externalId: ${this.externalId}`
      );
    return responseToken.token;
  };
}

export const getClerkSession = async (
  req: NextApiRequest
): Promise<ISession | null> => {
  const { userId } = getAuth(req);
  const user = userId ? await clerkClient.users.getUser(userId) : null;
  if (user && userId) {
    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) throw new Error("No email address for the session");
    return new ClerkSession({ email, externalId: userId });
  }
  return null;
};
