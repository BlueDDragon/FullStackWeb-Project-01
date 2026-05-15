type DataType = { type: "Carts" } | { type: "Orders" } | { type: "Wish" } | { type: "Setting" };

function LoadDataJSON<T>(key: string, defaultValue: string): T {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(`data_${key}`) || defaultValue);
    }

    return JSON.parse(defaultValue);
}

function SaveDataJSON<T>(key: string, value: T) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(`data_${key}`, JSON.stringify(value));
    }
}

export function LoadData<T>(type: DataType, defaultValue: string) {
    return LoadDataJSON<T>(type.type.toLowerCase(), defaultValue);
}

export function SaveData<T>(type: DataType, value: T) {
    SaveDataJSON(type.type.toLowerCase(), value);
}