"use client";

import { useMemo, useState } from "react";
import { SpotifyPlayer, type SpotifyController } from "@/components/SpotifyPlayer";
import { genres } from "@/data/genres";

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "home") {
    return <svg {...common}><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/></svg>;
  }
  if (name === "grid") {
    return <svg {...common}><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>;
  }
  if (name === "disc") {
    return <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r=".6" fill="currentColor"/></svg>;
  }
  if (name === "search") {
    return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></svg>;
  }
  if (name === "arrow") {
    return <svg {...common}><path d="M7 17 17 7M7 7h10v10"/></svg>;
  }
  if (name === "play") {
    return <svg {...common} fill="currentColor" stroke="none"><path d="M8 5.5c0-.8.9-1.3 1.6-.9l9.2 6.3c.6.4.6 1.3 0 1.7l-9.2 6.3c-.7.5-1.6 0-1.6-.9V5.5Z"/></svg>;
  }
  if (name === "pause") {
    return <svg {...common} fill="currentColor" stroke="none"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>;
  }
  if (name === "wave") {
    return <svg {...common}><path d="M3 12h2l2-6 4 12 3-9 2 6h5"/></svg>;
  }
  return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 8v4l2.5 2"/></svg>;
}

function Sidebar({ selectedId }: { selectedId: string }) {
  const navItems = [
    { label: "처음으로", target: "top", icon: "home" },
    { label: "장르 탐색", target: "genres", icon: "grid" },
    { label: "플레이어", target: "player", icon: "disc" },
  ];

  return (
    <aside className="sidebar" aria-label="주요 메뉴">
      <a className="sidebar-mark" href="#top" aria-label="EMfinder 처음으로">
        <span>e</span>
      </a>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <a
            href={`#${item.target}`}
            className={`sidebar-link ${item.target === "genres" ? "is-current" : ""}`}
            key={item.target}
            aria-label={item.label}
            title={item.label}
          >
            <Icon name={item.icon} size={21} />
            <span className="sidebar-tooltip">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <span className="sidebar-eq" aria-hidden="true"><i /><i /><i /><i /><i /></span>
        <span className="sidebar-version">EST. 2026</span>
      </div>
      <nav className="mobile-nav" aria-label="모바일 메뉴">
        {navItems.map((item) => (
          <a href={`#${item.target}`} key={item.target} aria-label={item.label}>
            <Icon name={item.icon} size={20} />
            <span>{item.label}</span>
          </a>
        ))}
        <span className="mobile-nav-active" data-genre={selectedId} />
      </nav>
    </aside>
  );
}

export default function HomePage() {
  const [selectedId, setSelectedId] = useState("house");
  const [query, setQuery] = useState("");
  const [controller, setController] = useState<SpotifyController | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const selectedGenre = genres.find((genre) => genre.id === selectedId) ?? genres[0];

  const filteredGenres = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ko");
    if (!normalized) return genres;

    return genres.filter((genre) => {
      const searchable = [
        genre.name,
        genre.english,
        ...genre.artists.map((artist) => artist.name),
        ...genre.tracks.flatMap((track) => [track.title, track.artist]),
      ].join(" ").toLocaleLowerCase("ko");
      return searchable.includes(normalized);
    });
  }, [query]);

  const togglePlayback = () => {
    if (!controller) {
      document.getElementById("player")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    controller.togglePlay();
  };

  const selectGenre = (id: string) => {
    setSelectedId(id);
    setIsPlaying(false);
  };

  return (
    <div className="site-shell" id="top">
      <Sidebar selectedId={selectedId} />

      <div className="page-column">
        <header className="topbar">
          <a className="wordmark" href="#top" aria-label="EMfinder 홈">
            <span className="wordmark-symbol">EM</span><span>FINDER</span><b>.</b>
          </a>
          <div className="topbar-search">
            <Icon name="search" size={19} />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="장르, 아티스트, 곡 검색"
              aria-label="장르, 아티스트, 곡 검색"
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="topbar-right">
            <span className="online-dot" aria-label="온라인" />
            <span className="topbar-note">SOUND EXPLORER <span>NO. 001</span></span>
            <div className="pixel-avatar" aria-label="EMfinder 아바타"><i /><i /><i /><i /><i /></div>
          </div>
        </header>

        <main className="main-content">
          <div className="eyebrow-row">
            <span className="eyebrow"><i /> ELECTRONIC MUSIC FIELD GUIDE</span>
            <span className="issue-label">VOL. 01 <span>—</span> 08 GENRES</span>
          </div>

          <section className="overview-grid" aria-label="선택 장르 및 카테고리">
            <article className={`feature-card ${selectedGenre.artwork}`}>
              <div className="feature-glow" />
              <div className="feature-topline">
                <span className="live-label"><i /> {isPlaying ? "NOW PLAYING" : "SELECTED FREQUENCY"}</span>
                <span className="feature-index">{selectedGenre.number} / 08</span>
              </div>
              <div className="turntable" aria-label={isPlaying ? "회전 중인 LP" : "정지한 LP"}>
                <div className={`record ${isPlaying ? "is-spinning" : ""}`}>
                  <div className="record-label"><span>EM<br />FINDER</span><i /></div>
                </div>
                <div className="record-light" />
                <div className="tonearm"><span className="tonearm-head" /><i /></div>
                <div className="platter-mark"><span>33⅓</span><small>RPM</small></div>
              </div>
              <div className="feature-copy">
                <div className="genre-kicker">GENRE / {selectedGenre.short}</div>
                <h1>{selectedGenre.name}<span className="title-period">.</span></h1>
                <p>{selectedGenre.tagline}</p>
                <div className="feature-actions">
                  <button
                    type="button"
                    className={`play-toggle ${isPlaying ? "is-playing" : ""}`}
                    onClick={togglePlayback}
                    aria-label={isPlaying ? "재생 일시정지" : "재생 시작"}
                    title={controller ? (isPlaying ? "일시정지" : "재생") : "Spotify 플레이어로 이동"}
                  >
                    <Icon name={isPlaying ? "pause" : "play"} size={19} />
                  </button>
                  <div className="feature-play-label">
                    <strong>{isPlaying ? "IN THE GROOVE" : "TUNE IN"}</strong>
                    <span>{controller ? "Spotify 플레이어와 연결됨" : "플레이리스트를 불러오는 중"}</span>
                  </div>
                  <div className="mini-wave" aria-hidden="true">
                    {[15, 25, 12, 32, 20, 37, 18, 29, 13, 24, 34, 17, 28, 12, 21].map((height, index) => (
                      <i key={index} style={{ "--bar-height": `${height}px` } as React.CSSProperties} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="feature-corner-label">SIDE A <span>·</span> PLAY LOUD</div>
            </article>

            <section className="category-section" id="genres">
              <div className="section-heading category-heading">
                <div>
                  <span className="section-kicker">BROWSE BY FREQUENCY</span>
                  <h2>장르를 <span>탐색하세요</span></h2>
                </div>
                <span className="count-label">{filteredGenres.length.toString().padStart(2, "0")} <i>/ 08</i></span>
              </div>
              <div className="category-chips" role="list" aria-label="전자음악 장르">
                {genres.map((genre) => (
                  <button
                    type="button"
                    key={genre.id}
                    className={`category-chip ${selectedId === genre.id ? "is-active" : ""}`}
                    onClick={() => selectGenre(genre.id)}
                    aria-pressed={selectedId === genre.id}
                  >
                    <span>{genre.name}</span>
                  </button>
                ))}
              </div>

              {filteredGenres.length > 0 ? (
                <div className="genre-card-grid">
                  {filteredGenres.map((genre, index) => (
                    <button
                      type="button"
                      className={`genre-card ${genre.artwork} ${selectedId === genre.id ? "is-selected" : ""}`}
                      key={genre.id}
                      onClick={() => selectGenre(genre.id)}
                      aria-pressed={selectedId === genre.id}
                      style={{ "--card-order": index } as React.CSSProperties}
                    >
                      <span className="genre-card-number">{genre.number}</span>
                      <span className="genre-card-art" aria-hidden="true"><i /><i /><i /></span>
                      <span className="genre-card-info">
                        <strong>{genre.name}</strong>
                        <small>{genre.english}</small>
                      </span>
                      <span className="genre-card-arrow"><Icon name="arrow" size={14} /></span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="empty-search">
                  <span>NO FREQUENCY FOUND</span>
                  <p>검색어와 일치하는 장르가 없어요. 다른 키워드로 검색해보세요.</p>
                </div>
              )}
              <div className="category-footnote"><span>SCROLL TO EXPLORE</span><span>↔</span></div>
            </section>
          </section>

          <section className="detail-grid" id="guide" aria-label={`${selectedGenre.name} 장르 가이드`}>
            <article className="guide-panel panel">
              <div className="panel-heading">
                <div>
                  <span className="section-kicker">GET TO KNOW THE SOUND</span>
                  <h2>{selectedGenre.english}<span className="heading-dot">.</span></h2>
                </div>
                <span className="panel-index">FIELD NOTE {selectedGenre.number}</span>
              </div>
              <p className="genre-description">{selectedGenre.description}</p>
              <div className="sound-tags" aria-label="사운드 키워드">
                {selectedGenre.soundTags.map((tag) => <span key={tag}>#{tag}</span>)}
              </div>
              <div className="listening-tip">
                <span className="tip-icon"><Icon name="wave" size={17} /></span>
                <div><small>LISTEN FOR THIS</small><p>{selectedGenre.listeningTip}</p></div>
              </div>
              <div className="panel-decoration" aria-hidden="true">EM<span>—</span>FM</div>
            </article>

            <article className="artists-panel panel">
              <div className="panel-heading compact-heading">
                <div>
                  <span className="section-kicker">KEY NAMES</span>
                  <h2>대표 아티스트</h2>
                </div>
                <span className="panel-index">03 ARTISTS</span>
              </div>
              <div className="artist-list">
                {selectedGenre.artists.map((artist, index) => (
                  <a
                    className="artist-row"
                    href={`https://open.spotify.com/search/${encodeURIComponent(artist.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    key={artist.name}
                  >
                    <span className={`artist-avatar avatar-${index + 1}`} aria-hidden="true"><i>{artist.name.charAt(0)}</i><b /></span>
                    <span className="artist-meta"><strong>{artist.name}</strong><small>{artist.note}</small></span>
                    <span className="artist-link"><Icon name="arrow" size={15} /></span>
                  </a>
                ))}
              </div>
              <div className="artists-footnote"><span>ARTISTS TO START WITH</span><span>↗ SPOTIFY</span></div>
            </article>

            <article className="tracks-panel panel">
              <div className="panel-heading compact-heading">
                <div>
                  <span className="section-kicker">FIRST LISTEN / 02 PICKS</span>
                  <h2>처음 듣는 두 곡</h2>
                </div>
                <span className="panel-index">A / B</span>
              </div>
              <div className="track-list">
                {selectedGenre.tracks.map((track, index) => (
                  <a
                    className="track-row"
                    href={`https://open.spotify.com/search/${encodeURIComponent(`${track.artist} ${track.title}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    key={track.title}
                  >
                    <span className="track-index">0{index + 1}</span>
                    <span className="track-cover" aria-hidden="true"><i /><b>{selectedGenre.short.slice(0, 2)}</b></span>
                    <span className="track-meta">
                      <span className={`track-badge ${track.label === "입문 추천" ? "is-starter" : ""}`}>{track.label}</span>
                      <strong>{track.title}</strong>
                      <small>{track.artist}</small>
                    </span>
                    <span className="track-open"><Icon name="arrow" size={15} /></span>
                    <span className="track-reason">{track.reason}</span>
                  </a>
                ))}
              </div>
            </article>

            <article className="playlist-panel panel" id="player">
              <div className="panel-heading compact-heading">
                <div>
                  <span className="section-kicker">LISTEN IN SPOTIFY</span>
                  <h2>플레이리스트</h2>
                </div>
                <span className="spotify-mark" aria-label="Spotify"><i /><i /><i /></span>
              </div>
              <div className="playlist-title-row">
                <div className={`playlist-art ${selectedGenre.artwork}`} aria-hidden="true"><Icon name="disc" size={24} /></div>
                <div><strong>{selectedGenre.playlistTitle}</strong><span>Curated by {selectedGenre.playlistCurator}</span></div>
                <span className="playlist-state"><i /> EMBED</span>
              </div>
              <SpotifyPlayer
                playlistId={selectedGenre.playlistId}
                playlistTitle={selectedGenre.playlistTitle}
                playlistUrl={selectedGenre.playlistUrl}
                onPlaybackChange={setIsPlaying}
                onControllerReady={setController}
              />
              <p className="playlist-note">Spotify 플레이어에서 재생하면 위 LP 애니메이션도 함께 움직여요.</p>
            </article>
          </section>

          <footer className="site-footer">
            <a className="footer-logo" href="#top">EMFINDER<span>.</span></a>
            <span>MADE FOR THE LOVE OF ELECTRONIC MUSIC</span>
            <a href="https://open.spotify.com" target="_blank" rel="noreferrer">POWERED BY SPOTIFY ↗</a>
          </footer>
        </main>
      </div>
    </div>
  );
}
