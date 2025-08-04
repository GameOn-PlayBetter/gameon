import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta name="title" content="Skillery – Unlock Your Potential" />
        <meta
          name="description"
          content="Live skill-building sessions for gaming, music, coding, fitness, and more. Learn from experts. Unlock your potential with Skillery."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://skillery.co/" />
        <meta property="og:title" content="Skillery – Unlock Your Potential" />
        <meta
          property="og:description"
          content="Live skill-building sessions for gaming, music, coding, fitness, and more. Learn from experts. Unlock your potential with Skillery."
        />
        <meta property="og:image" content="https://skillery.co/social-preview.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://skillery.co/" />
        <meta name="twitter:title" content="Skillery – Unlock Your Potential" />
        <meta
          name="twitter:description"
          content="Live skill-building sessions for gaming, music, coding, fitness, and more. Learn from experts. Unlock your potential with Skillery."
        />
        <meta name="twitter:image" content="https://skillery.co/social-preview.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}