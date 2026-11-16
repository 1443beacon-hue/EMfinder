import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMfinder — 전자음악 장르 가이드",
  description:
    "하우스부터 하이퍼팝과 아트팝까지 16개 장르를 탐색하고, SoundCloud 플레이리스트와 공연 소식을 만나보세요.",
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
