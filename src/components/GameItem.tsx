import {Content, Game, Platform, Store} from '../types';
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions,} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import {useGame} from "../hooks/useGame";

type GameItemProps = {
    game: Game;
    contents: Content[];
    platforms: Platform[];
    stores: Store[];
};

export default function GameItem({game, contents, platforms, stores}: GameItemProps) {
    const {dispatch} = useGame();

    const getContentName = (id: string) => {
        const content = contents.find(content => content.id === id);
        return content ? content.name : 'Unknown';
    };

    const getPlatformDetails = (id: string) => {
        const platform = platforms.find(platform => platform.id === id);
        return {name: platform?.name || 'Unknown', icon: platform?.icon || 'default-icon'};
    };

    const getStoreDetails = (id: string) => {
        const store = stores.find(store => store.id === id);
        return {name: store?.name || 'Unknown', icon: store?.icon || 'default-icon'};
    };

    const contentName = getContentName(game.content);
    const {name: platformName, icon: platformIcon} = getPlatformDetails(game.platform);
    const {name: storeName, icon: storeIcon} = getStoreDetails(game.store);

    // Construir rutas absolutas para las imágenes
    const platformIconPath = new URL(`/src/assets/logos/platforms-icons/${platformIcon}.svg`, import.meta.url).href;
    const storeIconPath = new URL(`/src/assets/logos/stores-icons/${storeIcon}.svg`, import.meta.url).href;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'get-game-by-id', payload: {id: game.id}})}
            >
                Update Game
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => dispatch({type: 'delete-game', payload: {id: game.id}})}
            >
                Delete Game
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList
            threshold={0.49}
        >
            <SwipeableListItem
                maxSwipe={0.50}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div
                    className="bg-white px-8 py-4 flex items-center justify-around w-full max-w-screen-md mx-auto">
                    {/* Contenedor del Logo de la Plataforma */}
                    <div className="flex-shrink-0 flex items-center justify-center mr-2">
                        <img src={platformIconPath} alt={`${platformName} Logo`} className="w-36 h-36"/>
                    </div>

                    {/* Contenedor del Texto */}
                    <div className="flex-grow min-w-0 max-w-xs mx-4 text-center">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{game.name}</h3>
                        <div className="text-sm text-gray-600">
                            <p className="mb-1">
                                <span className="font-semibold text-gray-800">Content Type:</span> {contentName}
                            </p>
                            <p className="mb-1">
                                <span className="font-semibold text-gray-800">Platform:</span> {platformName}
                            </p>
                            <p className="mb-1">
                                <span className="font-semibold text-gray-800">Store:</span> {storeName}
                            </p>
                            <p className="mb-1">
                                <span
                                    className="font-semibold text-gray-800">Release Date:</span> {game.releaseDate?.toDateString()}
                            </p>
                            <p>
                                <span className="font-semibold text-gray-800">Price:</span> ${game.price}
                            </p>
                        </div>
                    </div>

                    {/* Contenedor del Logo de la Tienda */}
                    <div className="flex-shrink-0 flex items-center justify-center ml-2">
                        <img src={storeIconPath} alt={`${storeName} Logo`} className="w-36 h-36"/>
                    </div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};
