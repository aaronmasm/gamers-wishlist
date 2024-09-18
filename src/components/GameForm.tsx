import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useGame} from "../hooks/useGame";
import {contents, platforms, stores} from "../data/options";
import {DayPicker} from "react-day-picker";
import "react-day-picker/style.css";
import {WishGame} from "../types";
import ErrorMessage from "./ErrorMessage";

export default function GameForm() {
    const {state, dispatch} = useGame();
    const [error, setError] = useState('');

    // Estado local del formulario
    const [formState, setFormState] = useState<WishGame>({
        name: '',
        content: '',
        platform: '',
        store: '',
        releaseDate: undefined,
        price: 0,
    });

    useEffect(() => {
        if (state.editingId) {
            const editingGame = state.games.filter(currentGame => currentGame.id === state.editingId)[0];
            setFormState(editingGame);
        }
    }, [state.editingId, state.games]);

    // Estado para almacenar tiendas filtradas
    const [filteredStores, setFilteredStores] = useState(stores);

    // Manejo de cambios en inputs y selects
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: name === 'price' ? Number(value) : value
        }));
    };

    // Manejo de cambio de fecha
    const handleDateChange = (date: Date | undefined) => {
        setFormState(prevState => ({
            ...prevState,
            releaseDate: date
        }));
    };

    // Manejo del envío del formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (Object.values(formState).includes('')) {
            setError("All fields are required");
            return;
        }

        if (state.editingId) {
            dispatch({type: 'update-game', payload: {game: {id: state.editingId, ...formState}}})
        } else {
            dispatch({
                type: 'add-game',
                payload: {
                    game: {
                        ...formState,
                        releaseDate: formState.releaseDate ? formState.releaseDate : undefined, // Mantener como Date
                    }
                }
            });
        }

        // Resetear el estado del formulario
        setFormState({
            name: '',
            content: '',
            platform: '',
            store: '',
            releaseDate: undefined,
            price: 0,
        });
    };

    // Actualizar tiendas filtradas basado en la plataforma seleccionada
    useEffect(() => {
        if (formState.platform) {
            const selectedPlatform = formState.platform;
            const filtered = stores.filter(store =>
                store.platforms.includes(selectedPlatform)
            );
            setFilteredStores(filtered);
        } else {
            setFilteredStores(stores);
        }
    }, [formState.platform]);

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editingId ? "Update Game" : "New Game"}
            </legend>

            {/* Display error message if there's an error */}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xl">Game:</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Add the Game name"
                    className="bg-slate-100 p-2"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="content" className="text-xl">Type of Content:</label>
                <select
                    id="content"
                    className="bg-slate-100 p-2"
                    name="content"
                    value={formState.content}
                    onChange={handleChange}
                >
                    <option value="">-- Please select --</option>
                    {contents.map(content => (
                        <option key={content.id} value={content.id}>{content.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="platform" className="text-xl">Platform:</label>
                <select
                    id="platform"
                    className="bg-slate-100 p-2"
                    name="platform"
                    value={formState.platform}
                    onChange={handleChange}
                >
                    <option value="">-- Please select --</option>
                    {platforms.map(platform => (
                        <option key={platform.id} value={platform.id}>{platform.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="store" className="text-xl">Store:</label>
                <select
                    id="store"
                    className="bg-slate-100 p-2"
                    name="store"
                    value={formState.store}
                    onChange={handleChange}
                >
                    <option value="">-- Please select --</option>
                    {filteredStores.map(store => (
                        <option key={store.id} value={store.id}>{store.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="releaseDate" className="text-xl">Release Date:</label>
                <div className="flex justify-center">
                    <DayPicker
                        id="releaseDate"
                        className="bg-slate-100 p-2 border-0"
                        mode="single"
                        selected={formState.releaseDate}
                        onSelect={handleDateChange}
                        footer={
                            formState.releaseDate
                                ? `Selected: ${formState.releaseDate.toLocaleDateString()}`
                                : "Pick a day."
                        }
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="price" className="text-xl">Price:</label>
                <input
                    type="number"
                    id="price"
                    placeholder="Add the price: e.g. 300"
                    className="bg-slate-100 p-2"
                    name="price"
                    value={formState.price}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId ? "Update Game" : "Save Game"}
            />
        </form>
    );
}
