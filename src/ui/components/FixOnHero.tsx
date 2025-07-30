interface FixOnHeroProps {
  colors?: {
    primary?: string;
    button?: string;
    buttonHover?: string;
  };
}

export function FixOnHero({ colors }: FixOnHeroProps) {
  return (
<div
  className="w-full px-6 py-20 text-white text-center"
  style={{ backgroundColor: colors?.primary || "#020B17" }}
>
      <h1 className="text-[32px] font-bold leading-tight tracking-tight">
        FixOn: DIY Smarter, Not Harder
      </h1>
      <p className="text-white/80 text-lg mt-4 max-w-2xl mx-auto">
        Live help with home and auto repairs from real people. From faucet leaks to engine tweaks, FixOn walks you through it all.
      </p>
    </div>
  );
}