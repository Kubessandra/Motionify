import type { NextApiRequest } from "next";
import { getClerkSession } from "./clerk";
import type { ISession } from "./types";

export const getSession = (req: NextApiRequest): Promise<ISession | null> =>
  getClerkSession(req);
