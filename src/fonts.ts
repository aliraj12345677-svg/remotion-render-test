import { continueRender, delayRender, staticFile } from "remotion";

// Loaded once; Bengali ("BN") and Latin ("LAT") fonts are bundled in public/fonts.
const handle = delayRender("fonts");
const faces = [
  ["BN", "bn-400.woff2", "400"],
  ["BN", "bn-700.woff2", "700"],
  ["LAT", "lat-400.woff2", "400"],
  ["LAT", "lat-700.woff2", "700"],
] as const;

Promise.all(
  faces.map(([fam, file, w]) =>
    new FontFace(fam, `url(${staticFile("fonts/" + file)})`, { weight: w }).load()
  )
).then((fs) => {
  fs.forEach((f) => document.fonts.add(f));
  continueRender(handle);
});

export const FONT_STACK = '"LAT", "BN", sans-serif';
