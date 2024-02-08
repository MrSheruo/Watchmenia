export const apiKey = import.meta.env.VITE_APIKEY || "";
export const apiToken = import.meta.env.VITE_APITOKEN || "";
export const baseImgURL = "https://image.tmdb.org/t/p/w500/";
export const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`,
  },
};
