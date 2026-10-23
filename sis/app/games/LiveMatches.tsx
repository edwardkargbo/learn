import MatchCard from "./MatchCard";

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

interface FootballApiResponse {
  matches?: Match[];
  pagination?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

async function getMatches(): Promise<Match[]> {
  const apiUrl = process.env.FOOTBALL_API_URL;
  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiUrl || !apiKey || !apiHost) {
    throw new Error("Football API environment variables are missing.");
  }

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost,
    },
    next: {
      revalidate: 15,
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`Football API returned status ${response.status}`);
  }

  const data: FootballApiResponse = await response.json();

  return Array.isArray(data.matches) ? data.matches : [];
}

export default async function LiveMatches() {
  let matches: Match[];

  try {
    matches = await getMatches();
  } catch (error) {
    console.error(
      "Unable to fetch football matches:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return (
      <section
        className="rounded-xl border border-red-200 bg-white p-8 text-center"
        role="alert"
      >
        <h2 className="text-lg font-bold text-gray-900">
          Matches temporarily unavailable
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          We couldn't retrieve the match list. Please try again shortly.
        </p>
      </section>
    );
  }

  if (matches.length === 0) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <h2 className="font-semibold text-gray-900">No matches found</h2>
        <p className="mt-2 text-sm text-gray-600">
          There are currently no matches in the API response.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Football matches">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-gray-900">Available Matches</h2>
        <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
          {matches.length} matches
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {matches.map((match, index) => (
          <MatchCard
            key={
              match.id ??
              `${match.home_team_name ?? "home"}-${match.away_team_name ?? "away"}-${index}`
            }
            match={match}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
