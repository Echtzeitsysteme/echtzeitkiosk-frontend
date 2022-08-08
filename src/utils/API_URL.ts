export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.echtzeitkiosk.mertalpulus.eu/v1"
    : "http://localhost:4000/v1";
