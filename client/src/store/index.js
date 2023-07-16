import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#9611d8", //"#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./cyberwave.jpeg",
  fullDecal: "./cyberwave.jpeg",
});

export default state;
