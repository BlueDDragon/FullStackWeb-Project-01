import { SearchViewContextType } from "@/context/SearchViewContext";
import { LoadData, SaveData } from "@/utils/storage/saveload";
import { SettingData } from "@/types/SettingData";

export function GetSettingData() {
    return LoadData<SettingData>({ type: "Setting" }, ("{}"));
}

export function SettingSearchViewType(viewType: SearchViewContextType) {
    const setting = GetSettingData();
    const isSettingEmpty = (!setting);

    const newSetting: SettingData = {
        searchView: viewType,
    }

    if (isSettingEmpty) {
        SaveData<SettingData>({ type: "Setting" }, newSetting);
    }

    SaveData<SettingData>({ type: "Setting" }, { ...setting, ...newSetting });
}