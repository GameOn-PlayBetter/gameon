import Image from "next/image";
import { getFrame } from "./registry";

export default function FrameOverlay({
  id, size = 128, children
}: { id: string; size?: number; children: React.ReactNode }) {
  const frame = getFrame(id);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Avatar/content */}
      <div className="relative z-10 w-full h-full rounded-full overflow-hidden">
        {children}
      </div>
      {/* Frame image */}
      <Image
        src={frame.asset}
        alt={frame.title}
        fill
        className="pointer-events-none select-none object-contain z-20"
        priority
      />
    </div>
  );
}