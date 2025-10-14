"use client";

import '@/styles.scss';
import { SettingProvider } from '@/contexts/SettingContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <SettingProvider>
          {children}
        </SettingProvider>
      </body>
    </html>
  );
}