"use client";

import { useEffect, useState } from "react";
import type { ArtistPick } from "@/data/genres";

type ArtworkResult = {
  imageUrl: string;
  sourceUrl: string;
  sourceTitle: string;
  kind: "ALBUM ART" | "ARTIST PHOTO";
};

const artworkCache = new Map<string, Promise<ArtworkResult | null>>();

async function readWikipediaImage(pageTitle: string): Promise<ArtworkResult | null> {
  const normalizedTitle = pageTitle.replaceAll(" ", "_");
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(normalizedTitle)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) return null;

    const article = await response.json();
    const imageUrl = article.thumbnail?.source ?? article.originalimage?.source;
    if (!imageUrl) return null;

    return {
      imageUrl,
      sourceUrl: article.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(normalizedTitle)}`,
      sourceTitle: article.title ?? pageTitle,
      kind: "ARTIST PHOTO",
    };
  } catch {
    return null;
  }
}

function findArtwork(artist: ArtistPick) {
  if (artist.artworkPageTitle) {
    const albumKey = `album:${artist.artworkPageTitle}`;
    let albumRequest = artworkCache.get(albumKey);
    if (!albumRequest) {
      albumRequest = readWikipediaImage(artist.artworkPageTitle).then((image) =>
        image ? { ...image, kind: "ALBUM ART" as const } : null,
      );
      artworkCache.set(albumKey, albumRequest);
    }

    return albumRequest.then(async (albumImage) => {
      if (albumImage) return albumImage;
      return findArtistPhoto(artist);
    });
  }

  return findArtistPhoto(artist);
}

function findArtistPhoto(artist: ArtistPick) {
  const key = `artist:${artist.imagePageTitle}`;
  let request = artworkCache.get(key);
  if (!request) {
    request = readWikipediaImage(artist.imagePageTitle);
    artworkCache.set(key, request);
  }
  return request;
}

function wikipediaUrl(pageTitle: string) {
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replaceAll(" ", "_"))}`;
}

export function ArtistList({ artists }: { artists: ArtistPick[] }) {
  const [artworks, setArtworks] = useState<Record<string, ArtworkResult | null>>({});

  useEffect(() => {
    let active = true;

    Promise.all(artists.map(async (artist) => [artist.name, await findArtwork(artist)] as const)).then((results) => {
      if (active) setArtworks(Object.fromEntries(results));
    });

    return () => {
      active = false;
    };
  }, [artists]);

  return (
    <div className="artist-list">
      {artists.map((artist, index) => {
        const artwork = artworks[artist.name];
        const streamUrl = `https://soundcloud.com/search?q=${encodeURIComponent(artist.name)}`;

        return (
          <article
            className={`artist-card ${artwork ? "has-artwork" : ""}`}
            key={artist.name}
            style={artwork ? ({ "--artist-image": `url("${artwork.imageUrl}")` } as React.CSSProperties) : undefined}
          >
            <a
              className="artist-card-credit"
              href={artwork?.sourceUrl ?? wikipediaUrl(artist.imagePageTitle)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${artist.name} ${artwork?.sourceTitle ?? "이미지"} 출처 열기`}
              title={artwork ? `${artwork.sourceTitle} · Wikipedia / Wikimedia` : "이미지를 찾지 못했어요 · Wikipedia에서 검색"}
            >
              <span>{artwork?.kind ?? "ARTIST"}</span>
              <span>↗</span>
            </a>
            <span className="artist-card-number">0{index + 1} / 03</span>
            <a className="artist-card-meta" href={streamUrl} target="_blank" rel="noreferrer">
              <strong>{artist.name}</strong>
              <small>{artist.note}</small>
            </a>
            <a className="artist-card-stream" href={streamUrl} target="_blank" rel="noreferrer" aria-label={`${artist.name}를 SoundCloud에서 찾기`}>
              ↗
            </a>
          </article>
        );
      })}
    </div>
  );
}
