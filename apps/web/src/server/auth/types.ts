export type ProviderNames = "github";

export interface ISession {
  externalId: string;
  email: string;
  getProviderAccessToken: (providerName: ProviderNames) => Promise<string>;
  getProviderRefreshToken: (providerName: ProviderNames) => Promise<string>;
}

export type GetSessionFunc = (params: {
  authorization: string;
  cookies: Record<string, string | undefined>;
}) => Promise<ISession | null>;
