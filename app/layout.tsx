import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMfinder — 전자음악 장르 가이드",
  description:
    "하우스부터 신스웨이브까지, 전자음악의 결을 발견하고 SoundCloud로 들어보세요.",
};

export const viewport: Viewport = {
  themeColor: "#111214",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
