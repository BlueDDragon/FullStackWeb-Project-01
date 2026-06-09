type DataType = 
    { type: "Carts", id: string } | 
    { type: "Orders", id: string } | 
    { type: "Wish", id: string } | 
    { type: "Setting" } | 
    { type: "Users" } | 
    { type: "Login" } |
    { type: "Review", isbn13: string };

function loadDataJSON<T>(key: string, defaultValue: string): T {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(`data_${key}`) || defaultValue);
    }

    return JSON.parse(defaultValue);
}

function saveDataJSON<T>(key: string, value: T) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(`data_${key}`, JSON.stringify(value));
    }
}

function getKey(type: DataType): string {
    switch (type.type) {
        case "Carts":
        case "Orders":
        case "Wish":
            return `${type.id}_${type.type.toLowerCase()}`;

        case "Setting":
        case "Login":
        case "Users":
        default:
            return `${type.type.toLowerCase()}`;
    }
}

export function loadData<T>(type: DataType, defaultValue: string) {
    return loadDataJSON<T>(getKey(type), defaultValue);
}

export function saveData<T>(type: DataType, value: T) {
    saveDataJSON(getKey(type), value);
}