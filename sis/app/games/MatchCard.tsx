"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface StreamServer {
  name?: string;
  url: string;
  type?: string;
  header?: Record<string, string>;
}

interface Match {
  id?: string | number;
  match_time?: string;
  match_status?: string;
  home_team_name?: string;
  home_team_logo?: string;
  homeTeamScore?: string | number;
  away_team_name?: string;
  away_team_logo?: string;
  awayTeamScore?: string | number;
  league_name?: string;
  league_logo?: string;
  servers?: StreamServer[];
}

interface MatchCardProps {
  match: Match;
  index: number;
}

export default function MatchCard({ match, index }: MatchCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const activeServerRef = useRef(-1);
  const triedServersRef = useRef(new Set<number>());
  const attemptIdRef = useRef(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeServerName, setActiveServerName] = useState("");

  const servers = (match.servers ?? []).filter(
    (server) =>
      typeof server.url === "string" && /^https?:\/\//i.test(server.url),
  );

  const stopCurrentPlayer = useCallback(() => {
    // Invalidate callbacks from an earlier playback attempt.
    attemptIdRef.current += 1;

    hlsRef.current?.destroy();
    hlsRef.current = null;

    const video = videoRef.current;

    if (video) {
      video.onloadedmetadata = null;
      video.onerror = null;
      video.onplaying = null;
      video.onpause = null;
      video.pause();
      video.removeAttribute("src");
      video.load();
    }

    activeServerRef.current = -1;
    setIsPlaying(false);
    setIsLoading(false);
    setActiveServerName("");
  }, []);

  const tryNextServer = useCallback(() => {
    const video = videoRef.current;

    if (!video) {
      setIsLoading(false);
      setError("The video player is not ready. Please try again.");
      return;
    }

    hlsRef.current?.destroy();
    hlsRef.current = null;

    video.onloadedmetadata = null;
    video.onerror = null;
    video.onplaying = null;
    video.onpause = null;
    video.pause();
    video.removeAttribute("src");
    video.load();

    const nextIndex = servers.findIndex(
      (_server, serverIndex) => !triedServersRef.current.has(serverIndex),
    );

    if (nextIndex === -1) {
      setIsLoading(false);
      setIsPlaying(false);
      setActiveServerName("");
      setError(
        "We couldn't play any available stream. Please try again later.",
      );
      return;
    }

    const server = servers[nextIndex];
    const attemptId = ++attemptIdRef.current;

    triedServersRef.current.add(nextIndex);
    activeServerRef.current = nextIndex;

    setIsLoading(true);
    setIsPlaying(false);
    setError("");
    setActiveServerName(server.name || `Server ${nextIndex + 1}`);

    const isCurrentAttempt = () => attemptIdRef.current === attemptId;

    const failover = () => {
      if (!isCurrentAttempt()) return;
      tryNextServer();
    };

    const startPlayback = async () => {
      if (!isCurrentAttempt()) return;

      try {
        await video.play();

        if (!isCurrentAttempt()) return;

        setIsPlaying(true);
        setIsLoading(false);
        setError("");
      } catch {
        failover();
      }
    };

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        manifestLoadingTimeOut: 10000,
        levelLoadingTimeOut: 10000,
        fragLoadingTimeOut: 15000,
      });

      hlsRef.current = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        void startPlayback();
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (!isCurrentAttempt() || !data.fatal) return;

        // A fatal error means this source cannot continue playing.
        failover();
      });

      hls.loadSource(server.url);
      hls.attachMedia(video);
      return;
    }

    // Safari and some Apple browsers support HLS natively.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = server.url;

      video.onloadedmetadata = () => {
        void startPlayback();
      };

      video.onerror = () => {
        failover();
      };

      return;
    }

    setIsLoading(false);
    setError("This browser does not support HLS playback.");
  }, [servers]);

  const handleWatchLive = useCallback(() => {
    if (servers.length === 0) {
      setError("No streaming servers are available for this match.");
      return;
    }

    stopCurrentPlayer();
    triedServersRef.current.clear();
    setError("");
    setIsLoading(true);

    // Start after the previous player has been reset.
    // The video element remains mounted in the JSX below.
    requestAnimationFrame(() => {
      tryNextServer();
    });
  }, [servers, stopCurrentPlayer, tryNextServer]);

  const handleStop = useCallback(() => {
    stopCurrentPlayer();
    triedServersRef.current.clear();
    setError("");
  }, [stopCurrentPlayer]);

  useEffect(() => {
    return () => {
      attemptIdRef.current += 1;
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, []);

  const timestamp = Number(match.match_time);

  const matchDate =
    Number.isFinite(timestamp) && timestamp > 0
      ? new Date(timestamp * 1000)
          .toISOString()
          .slice(0, 16)
          .replace("T", " ") + " UTC"
      : "";

  const status = match.match_status || "SCHEDULED";
  const isUpcoming = status.toLowerCase() === "vs";

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-900 shadow-sm transition-shadow hover:shadow-md">
      {/* League header */}
      <div className="flex items-center justify-between gap-3 border-b bg-gray-50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          {match.league_logo && (
            <img
              src={match.league_logo}
              alt=""
              className="h-7 w-7 shrink-0 object-contain"
            />
          )}

          <span className="truncate text-sm font-semibold text-gray-700">
            {match.league_name || "Football"}
          </span>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
            isUpcoming ? "bg-gray-200 text-gray-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isUpcoming ? "UPCOMING" : status.toUpperCase()}
        </span>
      </div>

      {/* Teams and score */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-6">
        <div className="flex min-w-0 flex-col items-center gap-3 text-center">
          {match.home_team_logo ? (
            <img
              src={match.home_team_logo}
              alt={match.home_team_name || "Home team"}
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl">
              ⚽
            </div>
          )}

          <span className="text-sm font-semibold sm:text-base">
            {match.home_team_name || "Home Team"}
          </span>
        </div>

        <div className="text-center">
          <div className="whitespace-nowrap text-2xl font-extrabold sm:text-3xl">
            {match.homeTeamScore ?? "-"}
            <span className="mx-2 text-gray-400">:</span>
            {match.awayTeamScore ?? "-"}
          </div>

          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">
            {isUpcoming ? "VS" : "Score"}
          </p>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-3 text-center">
          {match.away_team_logo ? (
            <img
              src={match.away_team_logo}
              alt={match.away_team_name || "Away team"}
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl">
              ⚽
            </div>
          )}

          <span className="text-sm font-semibold sm:text-base">
            {match.away_team_name || "Away Team"}
          </span>
        </div>
      </div>

      {matchDate && (
        <p className="pb-4 text-center text-xs text-gray-500">{matchDate}</p>
      )}

      {/* Streaming player */}
      <div className="space-y-3 border-t p-4">
        {servers.length > 0 ? (
          <>
            <div className="relative overflow-hidden rounded-xl bg-black">
              <video
                ref={videoRef}
                controls
                playsInline
                preload="none"
                aria-label={`Watch ${match.home_team_name || "home team"} vs ${match.away_team_name || "away team"}`}
                className="aspect-video w-full"
              />

              {!isPlaying && !isLoading && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl text-white shadow-lg">
                    ▶
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 text-white">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                  <p className="text-sm font-medium">
                    Connecting to a stream...
                  </p>
                </div>
              )}
            </div>

            {activeServerName && (
              <p className="text-xs text-gray-500">
                Source: {activeServerName}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={handleWatchLive}
                  disabled={isLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Connecting...
                    </>
                  ) : (
                    <>▶ Watch Live</>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStop}
                  className="rounded-lg bg-gray-800 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-900"
                >
                  ■ Stop Stream
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-xl bg-gray-50 px-4 py-6 text-center">
            <p className="font-semibold text-gray-700">No stream available</p>
            <p className="mt-1 text-sm text-gray-500">
              The API has not provided a streaming source for this match.
            </p>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}
      </div>
    </article>
  );
}
