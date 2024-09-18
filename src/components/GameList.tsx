import GameItem from "./GameItem";
import {useGame} from "../hooks/useGame";
import {contents, platforms, stores} from "../data/options";

type GameListProps = {
    search: string;
    platform: string;
    store: string;
    minPrice: string;
    maxPrice: string;
    date: string;
};

export default function GameList({
                                     search,
                                     platform,
                                     store,
                                     minPrice,
                                     maxPrice,
                                     date
                                 }: GameListProps) {
    const {state} = useGame();

    if (!state || !state.games) {
        return <p>Loading...</p>;
    }

    const filteredGames = state.games.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase());
        const matchesPlatform = platform ? game.platform === platform : true;
        const matchesStore = store ? game.store === store : true;
        const matchesMinPrice = minPrice ? game.price >= parseFloat(minPrice) : true;
        const matchesMaxPrice = maxPrice ? game.price <= parseFloat(maxPrice) : true;

        const gameReleaseDate = game.releaseDate ? new Date(game.releaseDate).toISOString().split('T')[0] : '';
        const selectedDate = date ? new Date(date).toISOString().split('T')[0] : '';
        const matchesDate = selectedDate ? gameReleaseDate === selectedDate : true;

        // Debugging output
        console.log({
            name: game.name,
            matchesSearch,
            matchesPlatform,
            matchesStore,
            matchesMinPrice,
            matchesMaxPrice,
            matchesDate
        });

        return (
            matchesSearch &&
            matchesPlatform &&
            matchesStore &&
            matchesMinPrice &&
            matchesMaxPrice &&
            matchesDate
        );
    });

    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg w-full py-10">
            <h2 className="font-bold text-3xl text-red-600 text-center">My Wishlist &hearts;</h2>

            <div className="flex justify-center mt-7">
                <ul className="w-full">
                    {filteredGames.length > 0 ? (
                        filteredGames.map((game) => (
                            <li key={game.id} className="w-full">
                                <GameItem
                                    game={game}
                                    contents={contents}
                                    platforms={platforms}
                                    stores={stores}
                                />
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No games found</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
