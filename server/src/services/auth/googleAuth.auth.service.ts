import { verifyGoogleUser } from "./index.auth.service.js";
import { findOrCreateGoogleUser } from "../../store/postgres/user.postgres.store.js";
import { generateJwt } from "../../utils/jwt.utils.js";

export const handleGoogleCallback = async (code: string): Promise<string> => {
    const googleUser = await verifyGoogleUser(code);
    const userId = await findOrCreateGoogleUser(googleUser);
    return generateJwt(userId);
};
