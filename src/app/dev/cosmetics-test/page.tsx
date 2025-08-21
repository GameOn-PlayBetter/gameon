import FrameOverlay from "@/cosmetics/FrameOverlay";
import BadgeIcon from "@/cosmetics/BadgeIcon";
import { FRAME_FOUNDER, BADGE_FOUNDER } from "@/cosmetics/ids";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white p-12">
      <h1 className="text-xl mb-6">Cosmetics Test</h1>

      <div className="flex items-center gap-6">
        {/* Avatar with Founder FRAME */}
        <FrameOverlay id={FRAME_FOUNDER} size={160}>
          {/* use ANY image in /public for now */}
          <img src="/favicon.png" alt="" className="w-full h-full object-cover" />
        </FrameOverlay>

        {/* Founder BADGE */}
        <BadgeIcon id={BADGE_FOUNDER} size={96} />
      </div>
    </div>
  );
}