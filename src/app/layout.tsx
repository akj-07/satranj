// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Chess Game',
  description: 'Play chess online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
          <body>
              <main>{children}</main>
          </body>
      </html>
  );
}
