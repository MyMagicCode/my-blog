export default function (r: number, g: number, b: number) {
  let R = r / 255;
  let G = g / 255;
  let B = b / 255;
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const range = max - min;
  let V = max;
  let S = V === 0 ? 0 : range / V;
  let H = 0;
  if (R === V) H = (60 * (G - B)) / range;
  if (G === V) H = 120 + (60 * (B - R)) / range;
  if (B === V) H = 240 + (60 * (R - G)) / range;
  if (range === 0) H = 0;
  if (H < 0) H += 360;
  H = parseFloat((H / 360).toFixed(2));
  V = parseFloat(V.toFixed(2));
  S = parseFloat(S.toFixed(2));
  return {
    H,
    V,
    S,
  };
}
