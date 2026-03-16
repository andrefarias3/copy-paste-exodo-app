export interface MainData {
    groups: MainGroup[]
};

export interface MainGroup {
    mainLabel: string,
    itemList: Item[]
};

export interface Item {
    label: string,
    value: number
};