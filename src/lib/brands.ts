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
fiton: {
  name: "FitOn",
  tagline: "Better Moves. Better You.",
  description:
    "Level up your fitness with live coaching, training plans, and real-time guidance.",
  logo: "/images/fiton/fiton_logo.png",
  companyName: "FitOn LLC",
  fontFamily: "Montserrat, sans-serif",
  fontClass: "font-['Montserrat']",
  showCenterLogo: true,
  socials: [
    { icon: "tiktok", href: "#" },
    { icon: "instagram", href: "#" },
    { icon: "twitter", href: "#" },
    { icon: "discord", href: "#" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/fiton/privacy-policy" },
    { label: "Cookie Policy", href: "/fiton/cookie-policy" },
    { label: "Safety Guidelines", href: "/fiton/safety-guidelines" },
    { label: "Coach Eligibility", href: "/fiton/coach-requirements-eligibility" },
    { label: "Contact", href: "/fiton/contact" },
    { label: "Terms of Service", href: "/fiton/terms-of-service" },
  ],
  colors: {
    primary: "#2A82B5",
    border: "border-white/30",
    glow: "#67CFFF",
    button: "#CC3333",
    buttonHover: "#DDAF2E",
    text: "#FFFFFF",
    hover: "#67CFFF",
  },
  forms: {
    waitlistUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSesUepKOGjzCWZFpjdYkpg4jZ9GdqGLVqAozbShkfLsHD2CWA/viewform?usp=dialog", // Student waitlist
    coachFormUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdvRLccUqutavNKZLAF7GF2jqfy0PRyJxppNz8hKfUX5dD8pw/viewform?usp=dialog", // Coach signup
  },
  reserveBlock: {
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdvRLccUqutavNKZLAF7GF2jqfy0PRyJxppNz8hKfUX5dD8pw/viewform?usp=dialog",
    buttonColor: "success",
    headline: "BECOME A COACH",
    subtext:
      "Apply now to join FitOn as a live fitness coach and start training students worldwide.",
    buttonText: "Sign Up to Coach",
  },
  featuredItems: [
    {
      title: "Strength Training",
      description:
        "Live sessions with expert trainers to build muscle safely and effectively.",
      image: "/images/fiton/featured/strength.jpg",
      href: "/fiton/strength",
    },
    {
      title: "Yoga & Flexibility",
      description:
        "Improve mobility and reduce stress with guided live yoga classes.",
      image: "/images/fiton/featured/yoga.jpg",
      href: "/fiton/yoga",
    },
    {
      title: "Cardio & HIIT",
      description:
        "Burn calories and boost stamina with high-energy, trainer-led workouts.",
      image: "/images/fiton/featured/cardio.jpg",
      href: "/fiton/cardio",
    },
  ],
}, // ✅ End FitOn brand
jamon: {
  name: "JamOn",
  tagline: "Live Music. Real Lessons. Pure Vibe.",
  description: "Learn, jam, and vibe with live music lessons and sessions.",
  logo: "/jamon/jamon_logo.png",
  companyName: "JamOn LLC",  // ✅ FIXED
  fontFamily: "sans-serif",
  fontClass: "font-sans",   // ✅ Matches your other Skillery brands
  showCenterLogo: false,
  socials: [
    { icon: "tiktok", href: "#" },      // optional if you add socials
    { icon: "instagram", href: "#" },
    { icon: "twitter", href: "#" },
    { icon: "discord", href: "#" },
  ],
  legalLinks: [  // ✅ FULL FOOTER LINKS LIKE FITON
    { label: "Privacy Policy", href: "/jamon/privacy-policy" },
    { label: "Cookie Policy", href: "/jamon/cookie-policy" },
    { label: "Safety Guidelines", href: "/jamon/safety-guidelines" },
    { label: "Coach Eligibility", href: "/jamon/coach-requirements-eligibility" },
    { label: "Contact", href: "/jamon/contact" },
    { label: "Terms of Service", href: "/jamon/terms-of-service" },
  ],
  colors: {
    primary: "#040000",
    secondary: "#00CFFF",
    glow: "#FF6A00", 
    button: "#FF6A00",
    buttonHover: "#FF8533",
    text: "#FFFFFF",
    hover: "#FFD9B3",
  },
forms: {
  waitlistUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSf6W87gRrxzA6pEMOz_Xyqj3wyJcJ3VAfn88aLh4qeu8umprA/viewform?usp=dialog", // Student/waitlist form
  studentFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSf6W87gRrxzA6pEMOz_Xyqj3wyJcJ3VAfn88aLh4qeu8umprA/viewform?usp=dialog", // Alias for clarity
  coachFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScm0_HE0ScDHm2OGFM3DE3i90AeI96gq-fl2p3tV2zkuMJvAw/viewform?usp=dialog", // Coach signup form
},
  reserveBlock: {
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScm0_HE0ScDHm2OGFM3DE3i90AeI96gq-fl2p3tV2zkuMJvAw/viewform?usp=dialog",
    buttonColor: "success",
    headline: "BECOME A MUSIC COACH",
    subtext: "Apply now to teach live music lessons on JamOn.",
    buttonText: "Start Coaching",
  },
},
}; // ✅ close brands object completely