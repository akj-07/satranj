// app/layout.tsx
export const metadata = {
  title: 'Chess Game',
  description: 'Play chess online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
          <body>
              <header>
                  <h1>My Chess Game</h1>
              </header>
              <main>{children}</main>
              <footer>Footer content here</footer>
          </body>
      </html>
  );
}
