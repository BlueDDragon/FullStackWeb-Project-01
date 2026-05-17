type DataType = 
    { type: "Carts", id: string } | 
    { type: "Orders", id: string } | 
    { type: "Wish", id: string } | 
    { type: "Setting" } | 
    { type: "Users" } | 
    { type: "Login" };

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

function GetKey(type: DataType): string {
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

export function LoadData<T>(type: DataType, defaultValue: string) {
    return LoadDataJSON<T>(GetKey(type), defaultValue);
}

export function SaveData<T>(type: DataType, value: T) {
    SaveDataJSON(GetKey(type), value);
}