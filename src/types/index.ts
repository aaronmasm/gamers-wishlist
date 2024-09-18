export type Game = {
    id: string;
    name: string;
    content: string;
    platform: string;
    store: string;
    releaseDate: Date | undefined;
    price: number;
};

export type WishGame = Omit<Game, 'id'>;

export type Content = {
    id: string;
    name: string;
};

export type Platform = {
    id: string;
    name: string;
    icon: string;
};

export type Store = {
    id: string;
    name: string;
    platforms: string[];
    icon: string;
};
