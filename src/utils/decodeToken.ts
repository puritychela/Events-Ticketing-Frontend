// src/utils/decodeToken.ts

interface DecodedToken {
  userId: number;
  email: string;
  role: string;
  exp?: number;
  iat?: number;
}

export const getUserFromToken = (): DecodedToken | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const base64Payload = token.split(".")[1]; // Extract the payload part of the JWT
    const decodedPayload = atob(base64Payload); // Decode from base64
    const parsedPayload: DecodedToken = JSON.parse(decodedPayload);
    return parsedPayload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
