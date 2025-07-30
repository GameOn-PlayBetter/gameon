export const brands = {
  gameon: {
    name: "GameOn",
    tagline: "Play Better Together",
    description: "🔥 THIS IS A TEST 🔥",
    logo: "/images/gameon/gameon_logo_stacked.png",
    companyName: "GameOn LLC",
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Restricted Games", href: "/restricted" },
      { label: "Terms of Use", href: "/terms" },
    ],
    colors: {
      primary: "#0A0A0A",
      border: "border-white/30",
      glow: "#FF00C8",
      button: "#DC00B0",
      buttonHover: "#e600b8",
    },
    fontFamily: "Orbitron", // ✅ changed
    reserveBlock: {
      buttonColor: "primary",
      headline: "JOIN THE ELITE",
      subtext: "Ready to share your knowledge?",
      buttonText: "Start Coaching",
      formUrl: "https://docs.google.com/forms/d/1LddJuKRXpjIFPaVevI-nyurxjnD3iofQpap8pjC-tII/viewform?edit_requested=true&pli=1",
    },
  },

  fixon: {
    name: "FixOn",
    tagline: "Live Repair Help. Confidence Built.",
    description: "Real-time help with home, pool, and auto repairs. All things home.",
    logo: "/images/fixon/fixon_logo_shinier.png",
    companyName: "FixOn",
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
    },
    fontFamily: "sans-serif", // ✅ changed
    reserveBlock: {
      buttonColor: "success",
      headline: "JOIN THE CREW",
      subtext: "Help others tackle DIY projects live.",
      buttonText: "Become a Fixer",
      formUrl: "https://fixon.com/form",
    },
  },
};