# EMfinder

하우스·테크노부터 하이퍼팝·아트팝까지 16개 전자음악 및 인접 장르를 소개하고, SoundCloud 플레이리스트와 서울 공연 정보를 연결하는 Next.js 웹페이지입니다.

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 여세요. 로컬 개발 서버는 Webpack을 사용합니다. SoundCloud 임베드의 재생·일시정지 상태가 LP와 음파 애니메이션에 반영됩니다.

아티스트 이미지는 Wikipedia/Wikimedia의 앨범 문서 이미지를 우선 불러오고, 없으면 아티스트 문서의 사진을 사용합니다. 이미지 카드를 누르면 출처 문서로 이동합니다.

## 빌드 및 배포

```bash
npm run build
npm run start
```

Vercel에서 이 저장소를 불러오면 Next.js 기본 설정으로 배포할 수 있습니다. SoundCloud 플레이리스트는 장르별 공개 URL을 사용하며 별도 API 키는 필요하지 않습니다.
