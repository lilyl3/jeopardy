export default function StartGame() {
    return (
      <div className="flex flex-col items-center justify-center p-12 mx-4">
        <div className="bg-white rounded-xl p-16 shadow-md">
            <h1 className="text-3xl font-bold text-blue-700 mb-8">
            Choose Team Names
            </h1>
    
            <div className="w-full max-w-md space-y-6">
            <label className="block">
                <span className="text-gray-700 font-medium">Team 1</span>
                <input
                type="text"
                placeholder="Enter team name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </label>
    
            <label className="block">
                <span className="text-gray-700 font-medium">Team 2</span>
                <input
                type="text"
                placeholder="Enter team name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </label>
    
            <button
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
            >
                Start Game
            </button>
            </div>
        </div>
      </div>
    );
}
  