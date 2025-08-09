import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number;
};

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (err) {
    console.error("Token decode error:", err);
    return true; // Treat error as expired
  }
}
