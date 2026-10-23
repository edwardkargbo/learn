import { Suspense } from "react";
import LiveMatches from "./LiveMatches";

function MatchesLoading() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white"
        >
          <div className="h-12 bg-gray-100" />
          <div className="space-y-5 p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="h-14 w-14 rounded-full bg-gray-200" />
              <div className="h-8 w-20 rounded bg-gray-200" />
              <div className="h-14 w-14 rounded-full bg-gray-200" />
            </div>
            <div className="h-10 rounded-lg bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GamesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-600" />
          <span className="text-sm font-bold uppercase tracking-widest text-red-600">
            Football Live
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
          Live Football Matches
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
          Follow fixtures, check scores, and watch available football streams
          from one place.
        </p>
      </header>

      <Suspense fallback={<MatchesLoading />}>
        <LiveMatches />
      </Suspense>

      <footer className="mt-12 border-t border-gray-200 py-6 text-center text-xs text-gray-500">
        Stream availability depends on the match and its authorized provider.
      </footer>
    </main>
  );
}
