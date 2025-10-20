"use client";

type SubLayoutProps = {
  children: React.ReactNode;
  team1Score?: number;
  team2Score?: number;
};

export default function SubLayout({
  children,
  team1Score = 0,
  team2Score = 0,
}: SubLayoutProps) {
  return (
    <div className="flex flex-col">
      
      {/* Header with scores */}
      <header className="flex justify-between items-center p-3">
        <div className="bg-red-100 text-lg font-semibold px-4 py-2 rounded shadow">
          <span className="mr-2">Team 1:</span>
          <span className="text-xl">{team1Score}</span>
        </div>
        <div className="bg-green-100 text-lg font-semibold px-4 py-2 rounded shadow">
          <span className="mr-2">Team 2:</span>
          <span className="text-xl">{team2Score}</span>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
