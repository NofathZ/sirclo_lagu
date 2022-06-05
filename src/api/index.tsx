import axios from "axios";

const lastFM = axios.create({
  baseURL: "http://ws.audioscrobbler.com/2.0",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default lastFM;
