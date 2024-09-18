import {ChangeEvent, useEffect, useState} from 'react';
import {platforms, stores} from "../data/options";

type SearchBarProps = {
    search: string;
    setSearch: (value: string) => void;
    platform: string;
    setPlatform: (value: string) => void;
    store: string;
    setStore: (value: string) => void;
    minPrice: string;
    setMinPrice: (value: string) => void;
    maxPrice: string;
    setMaxPrice: (value: string) => void;
    date: string;
    setDate: (value: string) => void;
};

export default function SearchBar({
                                      search, setSearch, platform, setPlatform, store, setStore, minPrice, setMinPrice,
                                      maxPrice, setMaxPrice, date, setDate
                                  }: SearchBarProps) {
    const [filteredStores, setFilteredStores] = useState(stores);

    useEffect(() => {
        if (platform) {
            const selectedPlatform = platform;
            const filtered = stores.filter(store =>
                store.platforms.includes(selectedPlatform)
            );
            setFilteredStores(filtered);
        } else {
            setFilteredStores(stores);
        }
    }, [platform]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        if (name === 'search') {
            setSearch(value);
        } else if (name === 'platform') {
            setPlatform(value);
        } else if (name === 'store') {
            setStore(value);
        } else if (name === 'minPrice') {
            setMinPrice(value);
        } else if (name === 'maxPrice') {
            setMaxPrice(value);
        } else if (name === 'date') {
            setDate(value);
        }
    };

    return (
        <form className="flex flex-wrap items-center justify-between gap-4 bg-gray-100 p-4 shadow-md w-full">
            <input
                type="text"
                name="search"
                value={search}
                onChange={handleChange}
                placeholder="Search games..."
                className="flex-grow p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
                value={platform}
                name="platform"
                onChange={handleChange}
                className="flex-grow sm:flex-none p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Platforms</option>
                {platforms.map(plataform => (
                    <option key={plataform.id} value={plataform.id}>{plataform.name}</option>
                ))}
            </select>

            <select
                value={store}
                name="store"
                onChange={handleChange}
                className="flex-grow sm:flex-none p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">All Stores</option>
                {filteredStores.map(store => (
                    <option key={store.id} value={store.id}>{store.name}</option>
                ))}
            </select>

            <div className="flex-grow sm:flex-none flex items-center gap-2">
                <input
                    type="number"
                    value={minPrice}
                    name="minPrice"
                    onChange={handleChange}
                    placeholder="Min Price"
                    className="w-full sm:w-32 min-w-[100px] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    value={maxPrice}
                    name="maxPrice"
                    onChange={handleChange}
                    placeholder="Max Price"
                    className="w-full sm:w-32 min-w-[100px] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <input
                type="date"
                value={date}
                name="date"
                onChange={handleChange}
                className="flex-grow sm:flex-none p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </form>
    );
}
