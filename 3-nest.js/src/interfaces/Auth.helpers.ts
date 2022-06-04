import { JwtPayload } from "jsonwebtoken";

// export interface TokenResponse extends JwtPayload {
//     userId: number;
// }

export interface TokenDecoded {
    userId: number;
}