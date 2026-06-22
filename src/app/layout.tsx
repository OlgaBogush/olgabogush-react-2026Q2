import '../index.css';

import { ReactNode } from 'react';
import { Providers } from './providers';

export const metadata = {
  title: 'Rick and Morty App',
  description: 'Migrated to Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
