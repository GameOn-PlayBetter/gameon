import { type Metadata } from "next";
import { getBrandConfig } from "@/lib/brands";

export async function generateMetadata({ params }: { params: { brand: string } }): Promise<Metadata> {
  const config = getBrandConfig(params.brand);

  if (!config) {
    return {
      title: "Skillery — Unlock Your Potential",
      description: "Live expert coaching across skills, trades, and passions.",
    };
  }

  return {
    title: `${config.name} — ${config.tagline}`,
    description: config.description,
    openGraph: {
      title: `${config.name} — ${config.tagline}`,
      description: config.description,
      url: `https://skillery.co/${params.brand}`,
      siteName: config.name,
      images: [
        {
          url: `https://skillery.co/${params.brand}/${params.brand}_og.png`,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.name} — ${config.tagline}`,
      description: config.description,
      images: [`https://skillery.co/${params.brand}/${params.brand}_og.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}