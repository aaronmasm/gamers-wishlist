import {createContext, Dispatch, ReactNode, useReducer} from "react";
import {GameActions, gameReducer, GameState, initialState} from "../reducers/game-reducer";

type GameContextProps = {
    state: GameState;
    dispatch: Dispatch<GameActions>;
};

type GameProviderProps = {
    children: ReactNode;
};

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({children}: GameProviderProps) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    return (
        <GameContext.Provider
            value={{state, dispatch}}
        >
            {children}
        </GameContext.Provider>
    );
};
