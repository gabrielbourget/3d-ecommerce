import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#9611d8", //"#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
});

export default state;
