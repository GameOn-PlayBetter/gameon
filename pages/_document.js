// app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skillery – Unlock Your Potential',
  description:
    'Live skill-building sessions for gaming, music, coding, fitness, and more. Learn from experts. Unlock your potential with Skillery.',
  openGraph: {
    type: 'website',
    url: 'https://skillery.co',
    title: 'Skillery – Unlock Your Potential',
    description:
      'Live skill-building sessions for gaming, music, coding, fitness, and more. Learn from experts. Unlock your potential with Skillery.',
    images: [
      {
        url: 'https://skillery.co/images/skillery-social-preview.png',
        width: 1200,
        height: 630,
        alt: 'Skillery Logo and Tagline',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skillery – Unlock Your Potential',
    description:
      'Live skill-building sessions for gaming, music, coding, fitness, and more. Learn from experts. Unlock your potential with Skillery.',
    images: ['https://skillery.co/images/skillery-social-preview.png'],
  },
};

export default function HomePage() {
  return (
    <div>
      {/* Your homepage JSX here */}
    </div>
  );
}