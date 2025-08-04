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
codeon: {
  name: "CodeOn",
  tagline: "Pull Requests Welcome. Questions too.",
  description: "Live coaching and support for coding, programming, and project building.",
  logo: "/images/codeon/codeon-logo.png",
  companyName: "CodeOn LLC",
  fontFamily: "'Fira Code', monospace", // ✅ Techy but readable
  showCenterLogo: false,
  waitlistForm: "https://docs.google.com/forms/d/e/1FAIpQLSfRFhCl06sOOekDJhJfNINXBgvglv4fG004fpgbIhO28GcliA/viewform?usp=dialog",
  coachForm: "https://docs.google.com/forms/d/e/1FAIpQLSeJCKV6nT2K39Y72PXNBkmx6A-12OEYfxu9EOKbYkCVQkul3A/viewform?usp=dialog",
  socials: [],
legalLinks: [
  { label: "Privacy Policy", href: "/codeon/privacy-policy" },
  { label: "Cookie Policy", href: "/codeon/cookie-policy" },
  { label: "Safety Guidelines", href: "/codeon/safety-guidelines" },
  { label: "Coach Eligibility", href: "/codeon/coach-requirements-eligibility" },
  { label: "Contact", href: "/codeon/contact" },
  { label: "Terms of Service", href: "/codeon/terms-of-service" },
],
  colors: {
    background: "#010512",   // Deep tech blue/black
    glow: "#00FFC8",         // Aqua glow for highlights
    button: "#00FFC8",       // Button color matches glow
    buttonHover: "#008CFF",  // Slightly darker hover
    text: "#FFFFFF",         // White text on dark background
  },
  reserveBlock: {
    headline: "Apply as a CodeOn Coach",
    subtext: "We are inviting experienced developers and programmers to become CodeOn coaches. Help learners with coding, projects, and debugging when we launch!",
    buttonText: "Apply as Coach",
    formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeJCKV6nT2K39Y72PXNBkmx6A-12OEYfxu9EOKbYkCVQkul3A/viewform?usp=dialog",
  },
}, // ✅ End CodeOn brand
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
  }, // ✅ close reserveBlock object properly
}, // ✅ close JamOn brand
learnon: {
  name: "LearnOn",
  tagline: "Live Learning. Lasting Success.",
  description:
    "Live learning sessions to help students and lifelong learners excel.",
  logo: "/images/learnon/learnon-logo.png",
  companyName: "LearnOn LLC",
  fontFamily: "Nunito, sans-serif",
  fontClass: "font-['Nunito']",
  showCenterLogo: false,
  socials: [
    { icon: "tiktok", href: "#" },
    { icon: "instagram", href: "#" },
    { icon: "twitter", href: "#" },
    { icon: "discord", href: "#" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/learnon/privacy-policy" },
    { label: "Cookie Policy", href: "/learnon/cookie-policy" },
    { label: "Safety Guidelines", href: "/learnon/safety-guidelines" },
    { label: "Coach Eligibility", href: "/learnon/coach-requirements-eligibility" },
    { label: "Contact", href: "/learnon/contact" },
    { label: "Terms of Service", href: "/learnon/terms-of-service" },
  ],
  colors: {
    primary: "#0A0A0A", 
    border: "border-white/30",
    glow: "#A56B2C",        
    button: "#1A2A5B",
    buttonHover: "#A56B2C",
    text: "#FFFFFF",
    hover: "#CBA135",
  },
  forms: {
    waitlistUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScBmxT9-07ECY-ZWRgvMBTD0EJaYaY6zM_3yMxIZhcFXR7uIw/viewform?usp=dialog", // Student interest form
    coachFormUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScSimd1XyMa8AWpaSo0qQAyzVwdUwe9EZgGUVcoSPT6o5byJA/viewform?usp=dialog", // Coach application form
  },
  reserveBlock: {
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScSimd1XyMa8AWpaSo0qQAyzVwdUwe9EZgGUVcoSPT6o5byJA/viewform?usp=dialog",
    buttonColor: "success",
    headline: "BECOME A COACH",
    subtext:
      "Apply now to join LearnOn as a live learning coach and start helping students worldwide.",
    buttonText: "Sign Up to Coach",
  },
  featuredItems: [
    {
      title: "Math & Science Help",
      description:
        "Get live, step-by-step help on tough assignments and core concepts.",
      image: "/images/learnon/featured/math.jpg",
      href: "/learnon/math",
    },
    {
      title: "Language Learning",
      description:
        "Practice speaking and improve your fluency with real-time conversation coaching.",
      image: "/images/learnon/featured/language.jpg",
      href: "/learnon/language",
    },
    {
      title: "Study Skills & Tutoring",
      description:
        "Learn smarter, not harder. Develop strong study habits and test prep strategies.",
      image: "/images/learnon/featured/study.jpg",
      href: "/learnon/study",
    },
  ],
}, // ✅ End LearnOn brand
styleon: {
  name: "StyleOn",
  tagline: "LIVE YOUR LOOK",
  description:
    "Learn to master your own beauty and style at home with live 1:1 sessions from real experts.",
  logo: "/images/styleon/styleon-logo.png",
  companyName: "StyleOn LLC",
  fontFamily: "Nunito, sans-serif",
  fontClass: "font-['Nunito']",
  showCenterLogo: false,
  socials: [
    { icon: "tiktok", href: "#" },
    { icon: "instagram", href: "#" },
    { icon: "twitter", href: "#" },
    { icon: "discord", href: "#" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/styleon/privacy-policy" },
    { label: "Cookie Policy", href: "/styleon/cookie-policy" },
    { label: "Safety Guidelines", href: "/styleon/safety-guidelines" },
    { label: "Coach Eligibility", href: "/styleon/coach-requirements-eligibility" },
    { label: "Contact", href: "/styleon/contact" },
    { label: "Terms of Service", href: "/styleon/terms-of-service" },
  ],
  colors: {
    primary: "#0A0A0A",
    border: "border-white/30",
    glow: "#8B0000",           // gold glow for beauty/luxury vibe
    button: "#A56B2C",         // warm gold-brown button
    buttonHover: "#444444",    // lighter gold hover
    text: "#FFFFFF",
    hover: "#FFD700",
  },
  forms: {
    waitlistUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScLW9RfsiHPB54C_kdDx2C4BRTg4IkYSC-Uyiz76Vq-W6JwnQ/viewform?usp=dialog", // Student interest form
    coachFormUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd0dUnJg-m34vIHALS-hAz3UUSTS80-2W3MQcBsFfZSmdGx7Q/viewform?usp=dialog", // Coach application form
  },
  reserveBlock: {
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd0dUnJg-m34vIHALS-hAz3UUSTS80-2W3MQcBsFfZSmdGx7Q/viewform?usp=dialog",
    buttonColor: "success",
    headline: "BECOME A COACH",
    subtext:
      "Apply now to join StyleOn and teach live DIY beauty skills in hair, makeup, and nails.",
    buttonText: "Sign Up to Coach",
  },
  featuredItems: [
    {
      title: "Hair Styling & Care",
      description:
        "Learn to create stunning looks, braids, and updos all by yourself at home.",
      image: "/images/styleon/featured/hair.jpg",
      href: "/styleon/hair",
    },
    {
      title: "Makeup & Skincare",
      description:
        "Master everyday and glam makeup while learning proper skin prep and care.",
      image: "/images/styleon/featured/makeup.jpg",
      href: "/styleon/makeup",
    },
    {
      title: "Nail Art & Self-Care",
      description:
        "Perfect at-home manicures, nail art, and self-care techniques with expert guidance.",
      image: "/images/styleon/featured/nails.jpg",
      href: "/styleon/nails",
    },
  ],
}, // ✅ End StyleOn brand
growon: {
  name: "GrowOn",
  tagline: "Plant. Learn. Thrive.",
  description:
    "Learn gardening, landscaping, lawn care, and plant care from experienced outdoor coaches.",
  logo: "/images/growon/growon-logo1.png",
  companyName: "GrowOn LLC",
  fontFamily: "Poppins, sans-serif",
  fontClass: "font-['Poppins']",
  showCenterLogo: false,
  socials: [], // No socials yet
  legalLinks: [
    { label: "Privacy Policy", href: "/growon/privacy-policy" },
    { label: "Cookie Policy", href: "/growon/cookie-policy" },
    { label: "Safety Guidelines", href: "/growon/safety-guidelines" },
    { label: "Coach Eligibility", href: "/growon/coach-requirements-eligibility" },
    { label: "Contact", href: "/growon/contact" },
    { label: "Terms of Service", href: "/growon/terms-of-service" },
  ],
  colors: {
    primary: "#0A1D1A",      // Dark soil background
    border: "border-white/20",
    glow: "#4CAF50",         // Vibrant green
    button: "#6B8E23",       // Olive green
    buttonHover: "#8FBC8F",  // Lighter green hover
    text: "#FFFFFF",
    hover: "#CBA135",        // Gold accent
  },
  forms: {
    waitlistUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScuiYejOy2kiTrzgrtLul1gsdcWkPVLf-JnYoOlosmenWzjqw/viewform?usp=dialog", // Student interest form
    coachFormUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd5zh3KkUgWT5VqY0leGrdk4csBZ7IgTTy2Qr-y8RB_rFzDWw/viewform?usp=dialog", // Coach application form
  },
  reserveBlock: {
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd5zh3KkUgWT5VqY0leGrdk4csBZ7IgTTy2Qr-y8RB_rFzDWw/viewform?usp=dialog",
    buttonColor: "success",
    headline: "BECOME A GROWON COACH",
    subtext:
      "Apply now to share your gardening and outdoor skills with students nationwide.",
    buttonText: "Sign Up to Coach",
  },
  featuredItems: [
    {
      title: "Vegetable & Flower Gardening",
      description:
        "Learn to plant, grow, and maintain healthy, beautiful gardens.",
      image: "/images/growon/featured/gardening.jpg",
      href: "/growon/gardening",
    },
    {
      title: "Lawn Care & Landscaping",
      description:
        "Master mowing, fertilizing, and designing the yard of your dreams.",
      image: "/images/growon/featured/lawn.jpg",
      href: "/growon/lawn",
    },
    {
      title: "Plant Care & Composting",
      description:
        "Discover how to keep your plants thriving and create rich soil naturally.",
      image: "/images/growon/featured/plants.jpg",
      href: "/growon/plants",
    },
  ],
}, // ✅ End GrowOn brand
cookon: {
  name: "CookOn",
  tagline: "Cook. Learn. Share.",
  description:
    "Learn cooking, baking, meal prep, and kitchen skills from expert home and professional chefs.",
  logo: "/images/cookon/cookon-logo.png",
  companyName: "CookOn LLC",
  fontFamily: "Poppins, sans-serif", // ✅ No Orbitron
  fontClass: "font-['Poppins']",
  showCenterLogo: false,
  socials: [], // Add later if needed
  legalLinks: [
    { label: "Privacy Policy", href: "/cookon/privacy-policy" },
    { label: "Cookie Policy", href: "/cookon/cookie-policy" },
    { label: "Safety Guidelines", href: "/cookon/safety-guidelines" },
    { label: "Coach Eligibility", href: "/cookon/coach-requirements-eligibility" },
    { label: "Contact", href: "/cookon/contact" },
    { label: "Terms of Service", href: "/cookon/terms-of-service" },
  ],
  colors: {
    primary: "#0D141A",      // ✅ Your requested background
    border: "border-white/20",
    glow: "#FF914D",         // Warm cooking accent
    button: "#801818",      
    buttonHover: "#3D5143", 
    text: "#FFFFFF",
    hover: "#FFD166",        // Golden accent for highlights
  },
  forms: {
    waitlistUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSd7kJCjrqEhtYXrYiYND90qfYILrIKI-myW-gwct3AZvdHVjQ/viewform?usp=dialog", // Student interest
    coachFormUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfiahiIqw4e0fq2Ac0IRfTdJHpU7pw0o6Iik0956tdM80Fuiw/viewform?usp=dialog", // Coach application
  },
  reserveBlock: {
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfiahiIqw4e0fq2Ac0IRfTdJHpU7pw0o6Iik0956tdM80Fuiw/viewform?usp=dialog",
    buttonColor: "success",
    headline: "BECOME A COOKON COACH",
    subtext:
      "Apply now to share your cooking skills and help others grow in the kitchen.",
    buttonText: "Sign Up to Coach",
  },
  featuredItems: [
    {
      title: "Cooking Basics & Meal Prep",
      description:
        "Master knife skills, meal planning, and simple home-cooked favorites.",
      image: "/images/cookon/featured/basics.jpg",
      href: "/cookon/basics",
    },
    {
      title: "Baking & Pastry",
      description:
        "From breads to desserts, learn techniques for perfect baking results.",
      image: "/images/cookon/featured/baking.jpg",
      href: "/cookon/baking",
    },
    {
      title: "International Cuisines",
      description:
        "Explore flavors from around the world and cook like a global chef.",
      image: "/images/cookon/featured/international.jpg",
      href: "/cookon/international",
    },
  ],
}, // ✅ End CookOn brand
}; // ✅ close brands object completely