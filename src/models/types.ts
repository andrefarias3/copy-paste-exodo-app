export interface MainData {
    clientName: string,
    groups: MainGroup[]
};

export interface MainGroup {
    mainLabel: string,
    itemList: Item[]
};

export interface Item {
    label: string,
    price: number,
    value: number
};