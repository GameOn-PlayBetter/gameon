"use client";

export const brands = {
  gameon: {
    name: "GameOn",
    tagline: "Play Better Together",
    description: "🔥 THIS IS A TEST 🔥",
    logo: "/images/gameon/go-logo.png",
    companyName: "GameOn LLC",
    fontFamily: "Orbitron",
    fontClass: "font-['Orbitron']", // ✅ Added
    showCenterLogo: false,
    socials: [
      { icon: "tiktok", href: "https://www.tiktok.com/@gameon.gg" },
      { icon: "instagram", href: "https://www.instagram.com/gameon_playbetter_together1/" },
      { icon: "twitter", href: "https://x.com/game_on_gg" },
      { icon: "discord", href: "https://discord.com/channels/1389283723412902080/1389283724851413164" },
    ],
legalLinks: [
  // ✅ Shared content
  { label: "Privacy Policy", href: "/brand/privacy-policy" },
  { label: "Cookie Policy", href: "/brand/cookie-policy" },
  { label: "Safety Guidelines", href: "/brand/safety-guidelines" },
  { label: "Coach Eligibility", href: "/gameon/coach-requirements-eligibility" },
  { label: "Contact", href: "/gameon/contact" },

  // ✅ GameOn-specific content
  { label: "Terms of Service", href: "/gameon/terms-of-service" },
  { label: "Prohibited Titles", href: "/gameon/prohibited-titles" },
],
    colors: {
      primary: "#0A0A0A",
      border: "border-white/30",
      glow: "#FF00C8",
      button: "#DC00B0",
      buttonHover: "#00CFFF",
      text: "#FFFFFF",
      hover: "#FF00C8",
    },
    reserveBlock: {
      formUrl: "#",
      buttonColor: "primary",
      headline: "JOIN THE ELITE",
      subtext: "Ready to share your knowledge?",
      buttonText: "Start Coaching",
    },
    featuredItems: [
      {
        title: "Minecraft",
        description: "Redstone builds, creative lessons, and survival strategies",
        image: "/images/gameon/featured/minecraft.jpg",
        href: "/gameon/minecraft",
      },
      {
        title: "League of Legends",
        description: "Climb ranks with pro strategies and macro coaching",
        image: "/images/gameon/featured/lol.jpg",
        href: "/gameon/league",
      },
      {
        title: "Dead by Daylight",
        description: "Survivor tips, killer mind games, and live gameplay analysis",
        image: "/images/gameon/featured/dbd.jpg",
        href: "/gameon/dbd",
      },
    ],
  },

  skillery: {
    name: "Skillery",
    tagline: "Unlock Your Potential",
    description: "Book expert help in anything from gaming to gardening.",
    logo: "/images/skillery_logo_wheadline.png",
    companyName: "Skillery LLC",
    fontFamily: "sans-serif",
    fontClass: "font-sans", // ✅ Added
    showCenterLogo: true,
    socials: [], // ✅ empty array prevents TS errors
legalLinks: [
  { label: "Privacy Policy", href: "/skillery/privacy-policy" },
  { label: "Cookie Policy", href: "/skillery/cookie-policy" },
  { label: "Safety Guidelines", href: "/skillery/safety-guidelines" },
  { label: "Coach Eligibility", href: "/skillery/coach-requirements-eligibility" },
  { label: "Contact", href: "/skillery/contact" },
  { label: "Terms of Service", href: "/skillery/terms-of-service" }, // optional if added
],
    colors: {
      primary: "#0F1E30",
      border: "border-white/30",
      glow: "#FF9C00",
      button: "#FF6B00",
      buttonHover: "#EF5716",
      text: "#FFFFFF",
      hover: "#FF9C00",
    },
    reserveBlock: {
      formUrl: "#",
      buttonColor: "default",
      headline: "LEARN LIVE",
      subtext: "Connect with experts across skills and passions.",
      buttonText: "Book a Session",
    },
    // ❌ No featuredItems for Skillery – landing page uses its own card grid
  },

  fixon: {
    name: "FixOn",
    tagline: "Live Repair Help. Confidence Built.",
    description: "Real-time help with home, pool, and auto repairs. All things home.",
    logo: "/images/fixon/fixon_logo_shinier.png",
    companyName: "FixOn",
    fontFamily: "sans-serif",
    fontClass: "font-sans", // ✅ Added
    showCenterLogo: true,
    socials: [],
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
    colors: {
      primary: "#020B17",
      border: "border-white/30",
      glow: "#FF9B6A",
      button: "#FF6B35",
      buttonHover: "#FF9B6A",
      text: "#E0E0E0",
      hover: "#FF9B6A",
    },
    forms: {
      waitlistUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSf7LbDaBGQBx7GnDxY5tn2ZCJerVM_VB5vuMpsWoRRKM1xoqA/viewform?usp=dialog", // Public waitlist
      coachFormUrl:
        "https://docs.google.com/forms/d/e/1FAIpQLSdH1f6FSxz7MBRtqTiFJGypHcPLkKfDfkPjhEDoxd5OjXgCKQ/viewform?usp=dialog", // Coach/fixer interest
    },
    reserveBlock: {
      formUrl: "#",
      buttonColor: "success",
      headline: "JOIN THE CREW",
      subtext: "Help others tackle DIY projects live.",
      buttonText: "Become a Fixer",
    },
    featuredItems: [
      {
        title: "Leaky Faucet",
        description: "Step-by-step help to fix common sink and faucet leaks",
        image: "/images/fixon/featured/faucet.jpg",
        href: "/fixon/faucet",
      },
      {
        title: "Pool Pump Troubleshooting",
        description: "Live guidance to diagnose and repair pool pump issues",
        image: "/images/fixon/featured/poolpump.jpg",
        href: "/fixon/poolpump",
      },
      {
        title: "AC Not Cooling",
        description: "Quick checks and minor fixes before calling a pro",
        image: "/images/fixon/featured/ac.jpg",
        href: "/fixon/ac",
      },
    ],
  },
};