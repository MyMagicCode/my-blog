export default function HSV2RGB(h: number, s: number, v: number) {
  if (h == 360) {
    h = 0;
  }
  const h1 = Math.trunc(h / 60) % 6;
  const f = h / 60 - h1;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0,
    g = 0,
    b = 0;
  switch (h1) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r: Math.trunc(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
