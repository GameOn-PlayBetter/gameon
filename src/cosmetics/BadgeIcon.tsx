import Image from "next/image";
import { getBadge } from "./registry";

export default function BadgeIcon({
  id, size = 64
}: { id: string; size?: number }) {
  const badge = getBadge(id);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={badge.asset}
        alt={badge.title}
        fill
        className="object-contain pointer-events-none select-none"
        priority
      />
    </div>
  );
}