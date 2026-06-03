import { SearchViewContextType } from "@/context/SearchViewContext";
import { loadData, saveData } from "@/utils/storage/saveload";
import { SettingData } from "@/types/SettingData";

export function getSettingData() {
    return loadData<SettingData>({ type: "Setting" }, ("{}"));
}

export function settingSearchViewType(viewType: SearchViewContextType) {
    const setting = getSettingData();
    const isSettingEmpty = (!setting);

    const newSetting: SettingData = {
        searchView: viewType,
    }

    if (isSettingEmpty) {
        saveData<SettingData>({ type: "Setting" }, newSetting);
    }

    saveData<SettingData>({ type: "Setting" }, { ...setting, ...newSetting });
}