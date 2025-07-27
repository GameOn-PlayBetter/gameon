"use client";

import React from "react";
import { useParams, notFound } from "next/navigation";
import BrandPageLayout from "@/ui/layouts/BrandPageLayout";
import { brands } from "@/lib/brands";
import { Button } from "@/ui/components/Button";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherZap, FeatherArrowRight, FeatherArrowRightCircle } from "@subframe/core";
import RotatingSearchInput from "@/ui/components/RotatingSearchInput";
import { Twitter, Instagram } from "lucide-react";
import { FaDiscord, FaTwitter, FaInstagram, FaReddit } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";

export default function BrandLandingPage() {
  const { brand } = useParams();
  const brandKey = brand as keyof typeof brands;
  const brandConfig = brands[brandKey];

  if (!brandConfig) notFound(); // ⬅️ this is all you need

  return (
    <BrandPageLayout
      logo={brandConfig.logo}
      backgroundColor={brandConfig.colors.primary}
    >
      <div className="flex flex-col items-center text-white gap-8 w-full px-4">
{/* 🔍 Skillery-style Search Input */}
<div className="w-full max-w-2xl">
  <RotatingSearchInput />
</div>
       
 {/* Waitlist CTA */}
      <div className="bg-[#111] border border-gray-700 rounded-3xl p-8 w-full max-w-md text-center">
  <h2 className="text-3xl font-bold mb-2">Be the First to Fix It</h2>
  <p className="opacity-80 mb-4">Join our waitlist and get early access to expert repair help.</p>
  <input
    type="email"
    placeholder="Enter your email"
    className="w-full p-3 rounded-md text-black mb-3"
  />
  <div className="flex justify-center">
    <Button size="large" className="bg-orange-500 hover:bg-orange-600 text-white">
      Join the Waitlist
    </Button>
  </div>
</div>

       {/* Repair Categories */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
 {[
  { title: "Plumbing", image: "/images/fixon/placeholder.jpg" },
  { title: "Auto Repair", image: "/images/fixon/placeholder.jpg" },
  { title: "Electrical", image: "/images/fixon/placeholder.jpg" },
  { title: "Yard & Pool", image: "/images/fixon/placeholder.jpg" },
  { title: "Appliances", image: "/images/fixon/placeholder.jpg" },
  { title: "General DIY", image: "/images/fixon/placeholder.jpg" },
].map((cat, i) => (
  <div
    key={cat.title}
    className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-700 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 flex flex-col items-start p-0"
  >
    <img
      src={cat.image}
      alt={cat.title}
      className="w-full h-40 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-bold text-left">{cat.title}</h3>
      <p className="opacity-80 text-sm text-left mt-2">
        Live help from trusted {cat.title.toLowerCase()} experts.
      </p>
      <Button
        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
        size="medium"
        variant="neutral-secondary"
        icon={<FeatherArrowRightCircle />}
      >
        Find Help
      </Button>
    </div>
  </div>
))}
</div>

        {/* Trusted Experts */}
       <div className="w-full max-w-6xl mt-20">
  <h2 className="text-3xl font-bold mb-6 uppercase text-left">TRUSTED EXPERTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
  <div
    key={i}
className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-700 transition-all duration-300 flex flex-col items-center p-6"
  >
<img
  src="/images/fixon/placeholder.jpg"
  alt={`Expert ${i}`}
  className="w-24 h-24 object-cover rounded-full mb-4"
/>
{/* 
  // TODO: Switch to actual expert image once available
  // <Avatar size="xl" src={`/images/fixon/expert${i}.png`} />
*/}
    <h3 className="mt-4 text-xl font-bold">Expert {i}</h3>
    <p className="opacity-80 text-sm text-center">Specialist in home repairs, tools, and hands-on help.</p>
    <Button
      className="mt-4"
      size="small"
      variant="neutral-secondary"
      icon={<FeatherArrowRightCircle />}
    >
      View Profile
    </Button>
  </div>
))}
          </div>
        </div>

        {/* Join the Elite */}
<div className="w-full max-w-4xl mt-24 mb-16 bg-[#1a1a1a] border border-gray-700 shadow-[0_0_12px_rgba(255,255,255,0.1)] p-8 rounded-3xl text-center">
<h2 className="text-3xl font-bold text-white mb-2">Become a FixOn expert</h2>
  <p className="text-white opacity-80 mb-4">
    Help others fix it right — live. Apply to join our expert team today.
  </p>
<div className="flex justify-center">
  <Button
    size="large"
    className="bg-orange-500 hover:bg-orange-600 text-white"
    icon={<FeatherArrowRight />}
  >
    Apply Now
  </Button>
</div>
</div>

{/* Connect With Us */}
<div className="flex flex-col items-center gap-4 mt-16">
  <h3 className="text-2xl font-bold text-white">Connect With Us</h3>
  <div className="flex justify-center gap-4">
    <IconButton icon={<FaDiscord size={24} />} />
    <IconButton icon={<FaTwitter size={24} />} />
    <IconButton icon={<FaInstagram size={24} />} />
    <IconButton icon={<SiBluesky size={24} />} />
    <IconButton icon={<FaReddit size={24} />} />
  </div>
</div>
      </div>
    </BrandPageLayout>
  );
}
