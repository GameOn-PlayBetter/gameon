import registry from "./registry.json";

type Cosmetic = {
  title: string;
  brandScope: "global";
  asset: string;
  thumb: string;
  animated: boolean;
  equipSlot: "frame" | "badge";
  freeForEarlySupporters?: boolean;
  priceTokens?: number;
};

type Registry = {
  version: number;
  frames: Record<string, Cosmetic>;
  badges: Record<string, Cosmetic>;
};

const R: Registry = registry as Registry;

// Freeze to prevent runtime mutation
Object.freeze(R);
Object.freeze(R.frames);
Object.freeze(R.badges);

export function getFrame(id: string): Cosmetic {
  const c = R.frames[id];
  if (!c) throw new Error(`Missing frame in registry: ${id}`);
  return c;
}

export function getBadge(id: string): Cosmetic {
  const c = R.badges[id];
  if (!c) throw new Error(`Missing badge in registry: ${id}`);
  return c;
}

export default R;