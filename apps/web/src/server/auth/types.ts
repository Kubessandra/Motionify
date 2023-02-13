export type ProviderType = "github" | "google"

export interface ISession {
  externalId: string;
  email: string;
  getProviderAccessToken: (provider: ProviderType) => Promise<string>;
}
