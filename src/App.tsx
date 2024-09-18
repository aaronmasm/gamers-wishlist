import GameList from "./components/GameList";
import GameModal from "./components/GameModal";
import {useGame} from "./hooks/useGame";
import {MouseEventHandler, useEffect, useState} from "react";
import SearchBar from "./components/SearchBar";

function App() {
    const {state, dispatch} = useGame();

    const [search, setSearch] = useState('');
    const [platform, setPlatform] = useState('');
    const [store, setStore] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        localStorage.setItem('games', JSON.stringify(state.games));
    }, [state.games]);

    const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
        dispatch({type: 'reset-app'});
    };

    return (
        <div className="bg-slate-100 flex flex-col min-h-screen">
            <header className="bg-orange-300 flex justify-between py-8 px-4">
                <h1 className="text-3xl font-black text-white drop-shadow-md">Gamer's Wishlist</h1>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 drop-shadow-md"
                    onClick={handleClick}
                >
                    Reset App
                </button>
            </header>

            <SearchBar
                search={search}
                setSearch={setSearch}
                platform={platform}
                setPlatform={setPlatform}
                store={store}
                setStore={setStore}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                date={date}
                setDate={setDate}
            />

            <main className="flex-grow flex justify-center py-10">
                <GameModal/>

                {state.games.length > 0 ? (
                    <div className="max-w-3xl w-full">
                        <GameList
                            search={search}
                            platform={platform}
                            store={store}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            date={date}
                        />
                    </div>
                ) : (
                    <h2 className="text-2xl text-gray-800 text-center">Your wish list is empty, please add a
                        game...</h2>
                )}
            </main>

            <footer className="bg-gray-700 text-white py-4">
                <div className="container mx-auto text-center">
                    <p className="text-sm">&copy; 2024 Gamer's Wishlist. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
