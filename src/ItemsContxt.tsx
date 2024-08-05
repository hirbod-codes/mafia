import React from 'react';

export type Item = {
    name: string
}

export type ItemsContextType = {
    items?: Item[];
    shuffledItems?: Item[];
    setItems?: (c: Item[]) => void | Promise<void>;
    shuffleItems?: () => void | Promise<void>;
}

export const ItemsContext = React.createContext<ItemsContextType | null>({
    items: [],
    shuffledItems: [],
    setItems: () => { },
    shuffleItems: () => { },
});
