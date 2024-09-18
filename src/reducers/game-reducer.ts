import {v4 as uuidv4} from 'uuid';
import {Game, WishGame} from "../types";

export type GameActions =
    | { type: 'show-modal' }
    | { type: 'add-game'; payload: { game: WishGame } }
    | { type: 'close-modal'; }
    | { type: 'reset-app'; }
    | { type: 'delete-game'; payload: { id: Game['id'] }; }
    | { type: 'get-game-by-id'; payload: { id: Game['id'] }; }
    | { type: 'update-game'; payload: { game: Game } };

export type GameState = {
    modal: boolean;
    games: Game[];
    editingId: Game['id'];
};

const localStorageGames = (): Game[] => {
    if (typeof window !== 'undefined') {
        const storedGames = localStorage.getItem('games');
        if (storedGames) {
            return JSON.parse(storedGames).map((game: Game) => ({
                ...game,
                releaseDate: new Date(game.releaseDate ?? new Date()),
            }));
        }
    }
    return [];
};

export const initialState: GameState = {
    modal: false,
    games: localStorageGames(),
    editingId: '',
};

// Create a new Game object with a unique ID
const createNewGame = (wishGame: WishGame): Game => {
    return {
        ...wishGame,
        id: uuidv4(),
    };
};

export const gameReducer = (
    state: GameState = initialState,
    action: GameActions
): GameState => {
    switch (action.type) {

        case "show-modal":
            console.log("Showing modal");
            return {
                ...state,
                modal: true,
            };

        case 'add-game':
            return {
                ...state,
                games: [
                    ...state.games,
                    createNewGame(action.payload.game),
                ],
                modal: false,
            };

        case "close-modal":
            return {
                ...state,
                modal: false,
                editingId: ''
            };

        case "reset-app":
            return {
                ...initialState,
                games: [],
            };

        case "delete-game":
            return {
                ...state,
                games: state.games.filter(game => game.id != action.payload.id)
            };

        case "get-game-by-id":
            return {
                ...state,
                editingId: action.payload.id,
                modal: true
            }

        case "update-game":
            return {
                ...state,
                games: state.games.map(game => game.id === action.payload.game.id ? action.payload.game : game),
                modal: false,
                editingId: ''
            }

        default:
            return state;
    }
};
