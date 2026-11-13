export type TrackPick = {
  title: string;
  artist: string;
  label: "장르 대표" | "입문 추천";
  reason: string;
};

export type ArtistPick = {
  name: string;
  note: string;
};

export type Genre = {
  id: string;
  name: string;
  english: string;
  short: string;
  number: string;
  tagline: string;
  description: string;
  listeningTip: string;
  soundTags: string[];
  artists: ArtistPick[];
  tracks: TrackPick[];
  playlistId: string;
  playlistTitle: string;
  playlistCurator: string;
  playlistUrl: string;
  artwork: string;
};

export const genres: Genre[] = [
  {
    id: "house",
    name: "하우스",
    english: "House",
    short: "HOUSE",
    number: "01",
    tagline: "네 박자의 그루브, 오래 머물고 싶은 리듬.",
    description:
      "일정하게 울리는 킥 위로 베이스와 보컬 샘플이 포개지는 댄스 음악. 디스코와 소울의 온기를 품으면서도, 반복되는 리듬이 자연스럽게 몸을 움직이게 해요.",
    listeningTip: "킥은 네 박자마다, 베이스와 보컬은 그 사이를 어떻게 채우는지 들어보세요.",
    soundTags: ["4/4 킥", "그루브", "보컬 샘플", "클럽의 온기"],
    artists: [
      { name: "Daft Punk", note: "디스코와 하우스를 팝 감각으로 연결" },
      { name: "Disclosure", note: "선명한 보컬과 현대적인 하우스 비트" },
      { name: "Todd Terje", note: "디스코의 색을 살린 유쾌한 그루브" },
    ],
    tracks: [
      {
        title: "Music Sounds Better with You",
        artist: "Stardust",
        label: "입문 추천",
        reason: "반복되는 보컬 샘플과 따뜻한 그루브가 하우스의 매력을 쉽게 들려줘요.",
      },
      {
        title: "Inspector Norse",
        artist: "Todd Terje",
        label: "장르 대표",
        reason: "디스코풍 신스와 탄탄한 4/4 리듬이 만드는 하우스의 즐거움을 보여줘요.",
      },
    ],
    playlistId: "2otQLmbi8QWHjDfq3eL0DC",
    playlistTitle: "House Music 2026: Future Dance Hits",
    playlistCurator: "Topsify",
    playlistUrl: "https://open.spotify.com/playlist/2otQLmbi8QWHjDfq3eL0DC",
    artwork: "art-house",
  },
  {
    id: "techno",
    name: "테크노",
    english: "Techno",
    short: "TECHNO",
    number: "02",
    tagline: "반복이 쌓일수록 깊어지는 기계적 몰입.",
    description:
      "단단하고 반복적인 비트 위에 신스와 질감이 조금씩 더해지는 음악. 멜로디보다 리듬의 추진력과 소리의 변화를 따라가며 긴 호흡으로 즐기는 경우가 많아요.",
    listeningTip: "처음과 끝의 차이를 찾아보세요. 작은 변화가 큰 고조감을 만들어요.",
    soundTags: ["기계적 반복", "4/4 킥", "점진적 전개", "클럽 몰입"],
    artists: [
      { name: "Jeff Mills", note: "디트로이트 테크노의 빠르고 정교한 추진력" },
      { name: "Carl Cox", note: "폭넓은 셀렉션과 강한 댄스플로어 에너지" },
      { name: "Charlotte de Witte", note: "묵직하고 현대적인 테크노 사운드" },
    ],
    tracks: [
      {
        title: "The Bells",
        artist: "Jeff Mills",
        label: "장르 대표",
        reason: "단순한 모티프와 밀어붙이는 리듬만으로 만드는 테크노의 긴장감.",
      },
      {
        title: "Your Mind",
        artist: "Adam Beyer & Bart Skils",
        label: "입문 추천",
        reason: "명료한 훅과 규칙적인 킥 덕분에 테크노의 반복 구조를 잡기 쉬워요.",
      },
    ],
    playlistId: "3CnE9v9FyUMoBT8ipvFAhA",
    playlistTitle: "KNTXT Techno Essentials",
    playlistCurator: "KNTXT",
    playlistUrl: "https://open.spotify.com/playlist/3CnE9v9FyUMoBT8ipvFAhA",
    artwork: "art-techno",
  },
  {
    id: "trance",
    name: "트랜스",
    english: "Trance",
    short: "TRANCE",
    number: "03",
    tagline: "천천히 쌓아 올려 한순간에 펼쳐지는 해방감.",
    description:
      "길게 이어지는 빌드업과 넓게 펼쳐지는 신스 멜로디가 중심인 댄스 음악. 반복되는 리듬 위로 긴장감이 쌓이고, 클라이맥스에서 한꺼번에 풀리는 감정이 특징이에요.",
    listeningTip: "멜로디가 처음 등장하는 순간과 다시 돌아오는 순간을 비교해보세요.",
    soundTags: ["긴 빌드업", "신스 아르페지오", "넓은 코드", "유포릭"],
    artists: [
      { name: "Paul van Dyk", note: "멜로디 중심 트랜스의 대표 주자" },
      { name: "Armin van Buuren", note: "대중적인 보컬·유포릭 트랜스" },
      { name: "Above & Beyond", note: "감성적인 코드와 선명한 후렴" },
    ],
    tracks: [
      {
        title: "For an Angel",
        artist: "Paul van Dyk",
        label: "장르 대표",
        reason: "반짝이는 아르페지오와 꾸준한 고조감이 클래식 트랜스의 상징이에요.",
      },
      {
        title: "Adagio for Strings",
        artist: "Tiësto",
        label: "입문 추천",
        reason: "익숙한 선율을 큰 신스와 댄스 비트로 풀어내 접근하기 쉬워요.",
      },
    ],
    playlistId: "37i9dQZF1DXbtYAdenGE9U",
    playlistTitle: "Trance Classics",
    playlistCurator: "Spotify",
    playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DXbtYAdenGE9U",
    artwork: "art-trance",
  },
  {
    id: "dnb",
    name: "드럼 앤 베이스",
    english: "Drum & Bass",
    short: "DNB",
    number: "04",
    tagline: "빠르게 잘린 브레이크와 깊게 움직이는 베이스.",
    description:
      "빠른 브레이크비트와 묵직한 저음이 함께 달리는 장르. 부드럽고 멜로딕한 리퀴드부터 거칠고 무거운 뉴로펑크까지, 하위 스타일에 따라 분위기가 크게 달라져요.",
    listeningTip: "빠른 드럼 아래에서 베이스가 길게 흐르는지, 짧게 튀는지 들어보세요.",
    soundTags: ["브레이크비트", "빠른 드럼", "서브베이스", "리퀴드 ↔ 뉴로"],
    artists: [
      { name: "Goldie", note: "브레이크비트와 소울을 엮은 정글·DnB의 상징" },
      { name: "Chase & Status", note: "거친 에너지와 대중적인 훅을 함께 구사" },
      { name: "Pendulum", note: "록의 추진력을 더한 멜로딕 DnB" },
    ],
    tracks: [
      {
        title: "Inner City Life",
        artist: "Goldie",
        label: "장르 대표",
        reason: "잘게 쪼갠 브레이크, 깊은 베이스, 보컬이 한 곡 안에서 만나요.",
      },
      {
        title: "Baddadan",
        artist: "Chase & Status, Bou, IRAH, Flowdan, Trigga",
        label: "입문 추천",
        reason: "반복되는 구호와 강한 드롭으로 현대 DnB의 에너지를 바로 느낄 수 있어요.",
      },
    ],
    playlistId: "6tlRHSvzXGvmOwLgV2XMHj",
    playlistTitle: "Drum & Bass 24/7",
    playlistCurator: "Hospital Records",
    playlistUrl: "https://open.spotify.com/playlist/6tlRHSvzXGvmOwLgV2XMHj",
    artwork: "art-dnb",
  },
  {
    id: "dubstep",
    name: "덥스텝",
    english: "Dubstep",
    short: "DUBSTEP",
    number: "05",
    tagline: "비워둔 박자 사이로 밀려오는 저음의 무게.",
    description:
      "영국 남부 런던의 클럽 문화에서 발전한 베이스 음악. 묵직한 서브베이스와 하프타임 리듬이 공간을 크게 만들어요. 오늘날에는 거친 드롭 중심의 브로스텝 등 여러 갈래로 나뉩니다.",
    listeningTip: "킥이 쉬는 순간에도 이어지는 낮은 베이스의 움직임을 들어보세요.",
    soundTags: ["서브베이스", "하프타임", "싱코페이션", "베이스 변주"],
    artists: [
      { name: "Skream", note: "초기 UK 덥스텝의 어둡고 묵직한 결" },
      { name: "Benga", note: "짧고 탄력적인 리듬과 베이스 디자인" },
      { name: "Flux Pavilion", note: "크고 선명한 신스로 알려진 브로스텝" },
    ],
    tracks: [
      {
        title: "Midnight Request Line",
        artist: "Skream",
        label: "장르 대표",
        reason: "공간을 남기는 드럼과 둥근 베이스로 초기 UK 덥스텝을 들려줘요.",
      },
      {
        title: "I Can't Stop",
        artist: "Flux Pavilion",
        label: "입문 추천",
        reason: "선명한 신스 훅과 큰 저음 덕분에 덥스텝의 드롭을 쉽게 만날 수 있어요.",
      },
    ],
    playlistId: "5Y3hC1SQTkWCEylRAyBiPA",
    playlistTitle: "Old School UK Dubstep",
    playlistCurator: "Chris Dawson",
    playlistUrl: "https://open.spotify.com/playlist/5Y3hC1SQTkWCEylRAyBiPA",
    artwork: "art-dubstep",
  },
  {
    id: "ambient",
    name: "앰비언트",
    english: "Ambient",
    short: "AMBIENT",
    number: "06",
    tagline: "박자보다 공간과 질감에 귀를 맡기는 음악.",
    description:
      "뚜렷한 비트나 전개보다 소리의 공간감과 천천히 변하는 질감에 집중하는 음악. 배경처럼 흘려들어도 좋고, 이어폰으로 작은 변화를 따라가도 좋아요.",
    listeningTip: "멜로디를 찾기보다 소리의 잔향과 서로 겹치는 층을 따라가 보세요.",
    soundTags: ["느린 변화", "공간감", "질감", "비트리스"],
    artists: [
      { name: "Brian Eno", note: "앰비언트 음악의 방향을 만든 선구자" },
      { name: "Hiroshi Yoshimura", note: "자연과 일상의 공간을 담은 환경음악" },
      { name: "Aphex Twin", note: "섬세한 전자 질감과 몽환적인 앰비언트" },
    ],
    tracks: [
      {
        title: "An Ending (Ascent)",
        artist: "Brian Eno",
        label: "입문 추천",
        reason: "부드럽게 이어지는 신스 패드가 앰비언트의 공간감을 편안하게 보여줘요.",
      },
      {
        title: "Green",
        artist: "Hiroshi Yoshimura",
        label: "장르 대표",
        reason: "자연의 풍경처럼 느린 음색 변화와 여백을 감상할 수 있어요.",
      },
    ],
    playlistId: "37i9dQZF1DWUrPBdYfoJvz",
    playlistTitle: "Ambient Essentials",
    playlistCurator: "Spotify",
    playlistUrl: "https://open.spotify.com/playlist/37i9dQZF1DWUrPBdYfoJvz",
    artwork: "art-ambient",
  },
  {
    id: "idm",
    name: "IDM",
    english: "Intelligent Dance Music",
    short: "IDM",
    number: "07",
    tagline: "익숙한 박자를 비틀고 전자음의 표정을 넓히다.",
    description:
      "정형화된 댄스 리듬을 비틀거나 잘게 쪼갠 전자음을 실험하는 음악을 가리킬 때 쓰는 이름이에요. 장르명 자체는 논쟁적이지만, 듣다 보면 앰비언트와 브레이크비트의 경계도 만날 수 있어요.",
    listeningTip: "반복되는 듯 달라지는 드럼 패턴과 배경에 숨어 있는 작은 소리를 찾아보세요.",
    soundTags: ["복합 리듬", "글리치", "실험적 신스", "브레이크비트"],
    artists: [
      { name: "Aphex Twin", note: "섬세한 멜로디부터 복잡한 비트까지 폭넓은 실험" },
      { name: "Autechre", note: "기계적이고 추상적인 리듬 구조" },
      { name: "Boards of Canada", note: "아날로그 질감과 기억을 불러오는 멜로디" },
    ],
    tracks: [
      {
        title: "Xtal",
        artist: "Aphex Twin",
        label: "입문 추천",
        reason: "따뜻한 신스와 느슨한 비트가 실험적인 전자음악으로 들어가는 문이 돼요.",
      },
      {
        title: "Roygbiv",
        artist: "Boards of Canada",
        label: "장르 대표",
        reason: "흐릿한 테이프 질감과 유기적인 리듬이 IDM의 감성적인 면을 보여줘요.",
      },
    ],
    playlistId: "3P9lEX8RzKkD3hNVvnoMc5",
    playlistTitle: "The Sound of Intelligent Dance Music",
    playlistCurator: "The Sounds of Spotify",
    playlistUrl: "https://open.spotify.com/playlist/3P9lEX8RzKkD3hNVvnoMc5",
    artwork: "art-idm",
  },
  {
    id: "synthwave",
    name: "신스웨이브",
    english: "Synthwave",
    short: "SYNTHWAVE",
    number: "08",
    tagline: "80년대의 상상으로 달리는 레트로 퓨처 사운드.",
    description:
      "80년대 영화와 게임 음악을 떠올리게 하는 아날로그풍 신스, 드럼 머신, 영화적인 분위기가 중심이에요. 밤의 도로와 네온사인을 연상시키는 레트로 퓨처 감성을 즐겨보세요.",
    listeningTip: "드럼 머신의 일정한 박자 위로 길게 번지는 신스와 보컬의 분위기를 느껴보세요.",
    soundTags: ["레트로 신스", "드럼 머신", "시네마틱", "네온 무드"],
    artists: [
      { name: "Kavinsky", note: "다크하고 영화적인 아웃런 사운드" },
      { name: "The Midnight", note: "색소폰과 보컬을 더한 감성적인 신스웨이브" },
      { name: "Carpenter Brut", note: "메탈의 에너지를 더한 다크신스" },
    ],
    tracks: [
      {
        title: "Nightcall",
        artist: "Kavinsky",
        label: "입문 추천",
        reason: "영화적인 신스와 보컬이 장르 특유의 야간 드라이브 분위기를 만들어요.",
      },
      {
        title: "Sunset",
        artist: "The Midnight",
        label: "장르 대표",
        reason: "반짝이는 신스와 색소폰, 큰 후렴이 감성적인 신스웨이브의 매력이에요.",
      },
    ],
    playlistId: "5iDmc6jnIpwCQ7UuBMCMAO",
    playlistTitle: "Synthwave · Retro · 80s Nights",
    playlistCurator: "PLAYLISTED",
    playlistUrl: "https://open.spotify.com/playlist/5iDmc6jnIpwCQ7UuBMCMAO",
    artwork: "art-synthwave",
  },
];
