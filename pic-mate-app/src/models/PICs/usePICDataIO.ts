import { useCallback, useMemo } from "react"
import { PICData } from "./PICData"
import { Storage } from "@ionic/storage";
import { PICName } from "./PICName";

export const usePICDataIO = () => {
    const storage: Storage = useMemo(() => new Storage(), []);
    storage.create();


    const PIC_DATA_KEY: string = 'PICS';

    const createKeyByPICName = useCallback((picName: PICName): string => {
        return `${PIC_DATA_KEY}-${picName.Value}`;
    }, []);

    /**
     * PICDataを保存する
     */
    const savePICData = useCallback(async (picData: PICData) => {
        const json: string = JSON.stringify(picData);
        const key: string = createKeyByPICName(picData.Name);
        await storage.set(key, json);
    }, [storage, createKeyByPICName]);

    /**
     * PICDataを読み込む
     */
    const loadPICData = useCallback(async (picName: PICName): Promise<PICData | undefined> => {
        const key: string = createKeyByPICName(picName);
        const json: string = await storage.get(key);
        if (!json) { return undefined; }
        const picData: PICData = JSON.parse(json);
        return picData;
    }, [storage, createKeyByPICName]);

    /**
     * PICDataを全て読み込む
     */
    const loadAllPICData = useCallback(async (): Promise<PICData[]> => {
        const picDataArray: PICData[] = [];
        await storage.forEach((value, key) => {
            if (key.includes(PIC_DATA_KEY)) {
                const picData: PICData = JSON.parse(value);
                picDataArray.push(picData);
            }
        });
        return picDataArray;
    }, [storage]);

    /**
     * PICDataを削除する
     */
    const deletePICData = useCallback(async (picName: PICName) => {
        const key: string = createKeyByPICName(picName);
        await storage.remove(key);
    }, [storage, createKeyByPICName]);

    return { savePICData, loadPICData, loadAllPICData, deletePICData };
}