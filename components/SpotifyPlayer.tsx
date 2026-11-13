"use client";

import { useEffect, useRef, useState } from "react";

type PlaybackUpdate = {
  data?: {
    isPaused?: boolean;
    isBuffering?: boolean;
    playingURI?: string;
  };
};

export type SpotifyController = {
  loadUri: (uri: string) => void;
  togglePlay: () => void;
  addListener: (event: string, listener: (event: PlaybackUpdate) => void) => void;
  destroy: () => void;
};

type SpotifyIFrameAPI = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width: string | number; height: number; theme?: number },
    callback: (controller: SpotifyController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  }
}

let spotifyApiPromise: Promise<SpotifyIFrameAPI> | null = null;

function loadSpotifyIFrameAPI() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Spotify player is only available in the browser."));
  }

  if (!spotifyApiPromise) {
    spotifyApiPromise = new Promise<SpotifyIFrameAPI>((resolve, reject) => {
      window.onSpotifyIframeApiReady = resolve;

      const existingScript = document.getElementById("spotify-iframe-api");
      if (existingScript) return;

      const script = document.createElement("script");
      script.id = "spotify-iframe-api";
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.onerror = () => reject(new Error("Spotify player could not be loaded."));
      document.body.appendChild(script);
    });
  }

  return spotifyApiPromise;
}

type SpotifyPlayerProps = {
  playlistId: string;
  playlistTitle: string;
  playlistUrl: string;
  onPlaybackChange: (playing: boolean) => void;
  onControllerReady: (controller: SpotifyController | null) => void;
};

export function SpotifyPlayer({
  playlistId,
  playlistTitle,
  playlistUrl,
  onPlaybackChange,
  onControllerReady,
}: SpotifyPlayerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  const playlistIdRef = useRef(playlistId);
  const onPlaybackChangeRef = useRef(onPlaybackChange);
  const onControllerReadyRef = useRef(onControllerReady);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    playlistIdRef.current = playlistId;
  }, [playlistId]);

  useEffect(() => {
    onPlaybackChangeRef.current = onPlaybackChange;
    onControllerReadyRef.current = onControllerReady;
  }, [onPlaybackChange, onControllerReady]);

  useEffect(() => {
    let cancelled = false;

    loadSpotifyIFrameAPI()
      .then((api) => {
        if (cancelled || !mountRef.current) return;

        api.createController(
          mountRef.current,
          {
            uri: `spotify:playlist:${playlistIdRef.current}`,
            width: "100%",
            height: 352,
            theme: 0,
          },
          (controller) => {
            if (cancelled) {
              controller.destroy();
              return;
            }

            controllerRef.current = controller;
            controller.addListener("playback_update", (event) => {
              onPlaybackChangeRef.current(!event.data?.isPaused);
            });
            controller.addListener("playback_started", () => {
              onPlaybackChangeRef.current(true);
            });
            onControllerReadyRef.current(controller);
          },
        );
      })
      .catch(() => {
        if (!cancelled) setFallback(true);
      });

    return () => {
      cancelled = true;
      controllerRef.current?.destroy();
      controllerRef.current = null;
      onControllerReadyRef.current(null);
    };
  }, []);

  useEffect(() => {
    const controller = controllerRef.current;
    if (controller) {
      controller.loadUri(`spotify:playlist:${playlistId}`);
      onPlaybackChangeRef.current(false);
    }
  }, [playlistId]);

  return (
    <div className="spotify-player-shell" aria-label={`${playlistTitle} Spotify 플레이어`}>
      {fallback ? (
        <iframe
          key={playlistId}
          title={`${playlistTitle} Spotify 플레이어`}
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <div ref={mountRef} className="spotify-player-mount" />
      )}
      <a className="spotify-open-link" href={playlistUrl} target="_blank" rel="noreferrer">
        Spotify에서 플레이리스트 열기 <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
