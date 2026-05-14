type DataType = { type: "Carts" } | { type: "Orders" } | { type: "Wish" };

function LoadDataJSON<T>(key: string): T {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(`data_${key}`) || ("{}"));
    }

    return JSON.parse("{}");
}

function SaveDataJSON<T>(key: string, value: T) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(`data_${key}`, JSON.stringify(value));
    }
}

export function LoadData<T>(type: DataType) {
    return LoadDataJSON<T>(type.type.toLowerCase());
}

export function SaveData<T>(type: DataType, value: T) {
    SaveDataJSON(type.type.toLowerCase(), value);
}