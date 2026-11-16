"use client";

import { useEffect, useRef, useState } from "react";

type SoundCloudWidgetOptions = {
  auto_play?: boolean;
  hide_related?: boolean;
  show_comments?: boolean;
  show_user?: boolean;
  show_reposts?: boolean;
  show_teaser?: boolean;
  visual?: boolean;
};

type SoundCloudWidget = {
  load: (url: string, options?: SoundCloudWidgetOptions) => void;
  toggle: () => void;
  bind: (eventName: string, listener: (event?: unknown) => void) => void;
};

export type SoundCloudController = Pick<SoundCloudWidget, "toggle">;

type SoundCloudWidgetFactory = {
  (iframe: HTMLIFrameElement): SoundCloudWidget;
  Events: {
    READY: string;
    PLAY: string;
    PAUSE: string;
    FINISH: string;
    ERROR: string;
  };
};

type SoundCloudAPI = {
  Widget: SoundCloudWidgetFactory;
};

declare global {
  interface Window {
    SC?: SoundCloudAPI;
  }
}

const widgetOptions: SoundCloudWidgetOptions = {
  auto_play: false,
  hide_related: true,
  show_comments: false,
  show_user: true,
  show_reposts: false,
  show_teaser: true,
  visual: false,
};

let soundCloudApiPromise: Promise<SoundCloudAPI> | null = null;

function loadSoundCloudWidgetAPI() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("SoundCloud player is only available in the browser."));
  }

  if (window.SC?.Widget) return Promise.resolve(window.SC);

  if (!soundCloudApiPromise) {
    soundCloudApiPromise = new Promise<SoundCloudAPI>((resolve, reject) => {
      const script = document.createElement("script");
      script.id = "soundcloud-widget-api";
      script.src = "https://w.soundcloud.com/player/api.js";
      script.async = true;
      script.onload = () => {
        if (window.SC?.Widget) resolve(window.SC);
        else reject(new Error("SoundCloud Widget API was not available."));
      };
      script.onerror = () => reject(new Error("SoundCloud Widget API could not be loaded."));
      document.body.appendChild(script);
    });
  }

  return soundCloudApiPromise;
}

function buildEmbedUrl(playlistUrl: string) {
  const params = new URLSearchParams({
    url: playlistUrl,
    color: "#d2f36b",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    show_teaser: "true",
    visual: "false",
  });

  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

type SoundCloudPlayerProps = {
  playlistTitle: string;
  playlistUrl: string;
  onPlaybackChange: (playing: boolean) => void;
  onControllerReady: (controller: SoundCloudController | null) => void;
};

export function SoundCloudPlayer({
  playlistTitle,
  playlistUrl,
  onPlaybackChange,
  onControllerReady,
}: SoundCloudPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [initialPlaylistUrl] = useState(playlistUrl);
  const playlistUrlRef = useRef(playlistUrl);
  const loadedPlaylistUrlRef = useRef(playlistUrl);
  const widgetRef = useRef<SoundCloudWidget | null>(null);
  const onPlaybackChangeRef = useRef(onPlaybackChange);
  const onControllerReadyRef = useRef(onControllerReady);
  const [apiUnavailable, setApiUnavailable] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    onPlaybackChangeRef.current = onPlaybackChange;
    onControllerReadyRef.current = onControllerReady;
  }, [onPlaybackChange, onControllerReady]);

  useEffect(() => {
    playlistUrlRef.current = playlistUrl;
    const widget = widgetRef.current;
    if (!widget || playlistUrl === loadedPlaylistUrlRef.current) return;

    setEmbedError(false);
    onPlaybackChangeRef.current(false);
    loadedPlaylistUrlRef.current = playlistUrl;
    widget.load(playlistUrl, widgetOptions);
  }, [playlistUrl]);

  useEffect(() => {
    let cancelled = false;
    let widget: SoundCloudWidget | null = null;

    loadSoundCloudWidgetAPI()
      .then((api) => {
        if (cancelled || !iframeRef.current) return;

        widget = api.Widget(iframeRef.current);
        widgetRef.current = widget;
        const events = api.Widget.Events;

        widget.bind(events.READY, () => {
          if (cancelled) return;
          setEmbedError(false);
          onControllerReadyRef.current(widget);
        });
        widget.bind(events.PLAY, () => {
          if (!cancelled) onPlaybackChangeRef.current(true);
        });
        widget.bind(events.PAUSE, () => {
          if (!cancelled) onPlaybackChangeRef.current(false);
        });
        widget.bind(events.FINISH, () => {
          if (!cancelled) onPlaybackChangeRef.current(false);
        });
        widget.bind(events.ERROR, () => {
          if (cancelled) return;
          setEmbedError(true);
          onPlaybackChangeRef.current(false);
        });

        const latestPlaylistUrl = playlistUrlRef.current;
        if (latestPlaylistUrl !== loadedPlaylistUrlRef.current) {
          loadedPlaylistUrlRef.current = latestPlaylistUrl;
          widget.load(latestPlaylistUrl, widgetOptions);
        }
      })
      .catch(() => {
        if (!cancelled) setApiUnavailable(true);
      });

    return () => {
      cancelled = true;
      widgetRef.current = null;
      onControllerReadyRef.current(null);
      onPlaybackChangeRef.current(false);
    };
  }, []);

  return (
    <div className="soundcloud-player-shell" aria-label={`${playlistTitle} SoundCloud 플레이어`}>
      <iframe
        ref={iframeRef}
        title={`${playlistTitle} SoundCloud 플레이어`}
        src={buildEmbedUrl(apiUnavailable ? playlistUrl : initialPlaylistUrl)}
        width="100%"
        height="352"
        allow="autoplay"
      />
      {embedError && (
        <p className="soundcloud-player-message" role="status">
          이 플레이리스트를 임베드에서 재생할 수 없어요. SoundCloud에서 직접 열어보세요.
        </p>
      )}
      {apiUnavailable && (
        <p className="soundcloud-player-message" role="status">
          재생은 가능하지만 LP 애니메이션 동기화 API를 불러오지 못했어요.
        </p>
      )}
      <a className="soundcloud-open-link" href={playlistUrl} target="_blank" rel="noreferrer">
        SoundCloud에서 플레이리스트 열기 <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
