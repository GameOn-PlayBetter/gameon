"use client";

export const brands = {
  gameon: {
    name: "GameOn",
    tagline: "Play Better Together",
    description: "🔥 THIS IS A TEST 🔥",
    logo: "/images/gameon/go-logo.png",
    companyName: "GameOn LLC",
    fontFamily: "Orbitron",
    showCenterLogo: false, // ✅ No giant logo in center
    socials: [
      { icon: "tiktok", href: "https://www.tiktok.com/@gameon.gg" },
      { icon: "instagram", href: "https://www.instagram.com/gameon_playbetter_together1/" },
      { icon: "twitter", href: "https://x.com/game_on_gg" },
      { icon: "discord", href: "https://discord.com/channels/1389283723412902080/1389283724851413164" },
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Prohibited Titles", href: "/prohibited-titles" },
      { label: "Coach Eligibility", href: "/coach-requirements-eligibility" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Safety Guidelines", href: "/safety-guidelines" },
      { label: "Contact", href: "/contact" },
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
  },

  skillery: {
    name: "Skillery",
    tagline: "Unlock Your Potential",
    description: "Book expert help in anything from gaming to gardening.",
    logo: "/images/skillery_logo_wheadline.png",
    companyName: "Skillery LLC",
    fontFamily: "sans-serif",
    showCenterLogo: true, // ✅ Skillery keeps the splash center logo
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Contact", href: "/contact" },
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
  },

  fixon: {
    name: "FixOn",
    tagline: "Live Repair Help. Confidence Built.",
    description: "Real-time help with home, pool, and auto repairs. All things home.",
    logo: "/images/fixon/fixon_logo_shinier.png",
    companyName: "FixOn",
    fontFamily: "sans-serif",
    showCenterLogo: true, // ✅ Now the center logo shows
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
    reserveBlock: {
      formUrl: "#",
      buttonColor: "success",
      headline: "JOIN THE CREW",
      subtext: "Help others tackle DIY projects live.",
      buttonText: "Become a Fixer",
    },
  },
};