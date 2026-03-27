import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#0f0e17] text-[#e8e8f0] antialiased">
        {children}
      </body>
    </html>
  );
}
