"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { brands } from "@/lib/brands";

interface BrandThemeContextProps {
  colors: {
    primary: string;
    accent?: string;
    button: string;
    buttonHover: string;
    text?: string;
    hover?: string;
    glow?: string;
  };
  name: string;
  logo: string;
  companyName: string;
  tagline?: string;
  fontFamily?: string;
  socials: { icon: string; href: string }[];
  legalLinks?: { label: string; href: string }[];
}

const fallbackTheme: BrandThemeContextProps = {
  colors: {
    primary: "#000000",
    button: "#666666",
    buttonHover: "#999999",
    text: "#FFFFFF",
  },
  name: "Loading...",
  logo: "/images/skillery_logo_footer_hd.png",
  companyName: "Loading...",
  socials: [],
  legalLinks: [],
};

const BrandThemeContext = createContext<BrandThemeContextProps>(fallbackTheme);

export function BrandThemeProvider({
  children,
  brandName,
}: {
  children: ReactNode;
  brandName?: string;
}) {
  const params = useParams();
  const [theme, setTheme] = useState<BrandThemeContextProps>(fallbackTheme);

  useEffect(() => {
    const key = (brandName ?? (params?.brand as string) ?? "skillery")?.toLowerCase();
    const brandConfig = brands[key as keyof typeof brands];

    if (!brandConfig) {
      console.warn(`⚠️ BrandThemeProvider: brand "${key}" not found, using fallback`);
      return;
    }

    setTheme({
      colors: brandConfig.colors,
      name: brandConfig.name,
      logo: brandConfig.logo ?? "/images/skillery_logo_footer_hd.png",
      companyName: brandConfig.companyName ?? "Your Brand",
      tagline: brandConfig.tagline,
      fontFamily: brandConfig.fontFamily,
      socials: brandConfig.socials ?? [],
      legalLinks: brandConfig.legalLinks ?? [],
    });
  }, [brandName, params?.brand]);

  return (
    <BrandThemeContext.Provider value={theme}>
      {children}
    </BrandThemeContext.Provider>
  );
}

export function useBrandTheme() {
  return useContext(BrandThemeContext);
}