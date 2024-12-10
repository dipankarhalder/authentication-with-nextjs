import jwt, {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable");
}

interface VerifiedToken {
  userId: string;
  iat: number;
  exp: number;
}

export const verifyToken = async (
  token: string
): Promise<VerifiedToken | { success: false; message: string }> => {
  try {
    /* handle valid token */
    const varifiedToken = await jwt.verify(token, JWT_SECRET || "") as VerifiedToken;
    return varifiedToken;
  } catch (err) {
    if (err instanceof TokenExpiredError) {

      /* handle token expiration */
      return {success: false, message: 'Token has expired. Please log in again.'};
    } else if (err instanceof JsonWebTokenError) {

      /* handle general errors like invalid token, signature issues */
      return {success: false, message: 'Unauthorized Access! Please login again.'};
    } else {

      /* handle any other unexpected errors */
      return {success: false, message: 'An unexpected error occurred.'};
    }
  }
};
