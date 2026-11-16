export type SceneItem = {
  day: string;
  month: string;
  kind: "CLUB NIGHT" | "LIVE / DJ" | "MUSIC & ART";
  title: string;
  description: string;
  details: string;
  linkLabel: string;
  url: string;
  source: string;
  sourceUrl: string;
};

// Seoul listings checked against organizer, ticketing, and editorial pages on 2026-11-16.
export const sceneItems: SceneItem[] = [
  {
    day: "11",
    month: "DEC",
    kind: "LIVE / DJ",
    title: "220 Chapter II: Mau P",
    description: "하우스와 테크하우스 셋을 만나는 연말 클럽 나이트.",
    details: "CREST 72 · SEOUL · 18:00–03:00",
    linkLabel: "Resident Advisor",
    url: "https://ra.co/events/2569403",
    source: "Resident Advisor · 2026.11.16 확인",
    sourceUrl: "https://ra.co/events/2569403",
  },
  {
    day: "12",
    month: "DEC",
    kind: "CLUB NIGHT",
    title: "foreign body × Keep Hush",
    description: "Saint Ludo가 헤드라인을 맡는 360° DJ 부스 이벤트. 추가 라인업은 주최 측 공지를 확인하세요.",
    details: "BLANK SITE · SEOUL · 22:00–05:00",
    linkLabel: "Keep Hush 티켓 / 상세",
    url: "https://keephush.net/events/foreign-body-seoul",
    source: "Keep Hush · 주최 측 안내",
    sourceUrl: "https://keephush.net/events/foreign-body-seoul",
  },
  {
    day: "19",
    month: "DEC",
    kind: "MUSIC & ART",
    title: "NIGHT HIKE TOURS 2026 in Seoul",
    description: "보컬로이드·인터넷 음악과 비주얼 아트가 만나는 일본발 페스티벌의 서울 공연.",
    details: "YES24 WANDERLOCH HALL · DOORS 13:30",
    linkLabel: "YES24 예매 정보",
    url: "https://ticket.yes24.com/English/Perf/60949",
    source: "NiEW · 공연 소식",
    sourceUrl: "https://niewmedia.com/en/news/2611nighthike-seoul",
  },
];

export const eventCalendarUrl = "https://ra.co/events/kr/seoul";
export const sceneUpdatedAt = "2026.11.16";
