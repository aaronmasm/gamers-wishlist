import {Content, Platform, Store} from "../types";

export const contents: Content[] = [
    {id: '1', name: 'Base Game'},
    {id: '2', name: 'DLC'},
    {id: '3', name: 'Battle Pass'},
    {id: '4', name: 'Update'},
];

export const platforms: Platform[] = [
    {id: '1', name: 'PC', icon: 'pc'},
    {id: '2', name: 'PlayStation', icon: 'playstation5'},
    {id: '3', name: 'Xbox', icon: 'xbox-series-x'},
    {id: '4', name: 'Nintendo Switch', icon: 'nintendo-switch'},
];

export const stores: Store[] = [
    {id: '1', name: 'Steam', platforms: ['1'], icon: 'steam'},
    {id: '2', name: 'Epic Games Store', platforms: ['1'], icon: 'epic'},
    {id: '3', name: 'PlayStation Store', platforms: ['2'], icon: 'playstation-store'},
    {id: '4', name: 'Xbox Store', platforms: ['1', '3'], icon: 'xbox-store'},
    {id: '5', name: 'Nintendo eShop', platforms: ['4'], icon: 'nintendo-eShop'},
];
