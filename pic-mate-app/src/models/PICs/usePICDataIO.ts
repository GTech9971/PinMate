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

    const serialize = useCallback((value: any): string => {
        return JSON.stringify(value, (_, propValue) => {
            if (typeof propValue === 'function') {
                return propValue.toString();
            }
            return propValue;
        });
    }, []);

    const deserialize = useCallback((serializedValue: string): PICData => {
        return JSON.parse(serializedValue, (_, propValue) => {
            if (typeof propValue === 'string' && propValue.startsWith('function')) {
                return eval(`(${propValue})`);
            }
            return propValue;
        });
    }, []);

    /**
     * PICDataを保存する
     */
    const savePICData = useCallback(async (picData: PICData) => {
        const json: string = serialize(picData);
        const key: string = createKeyByPICName(picData.Name);
        await storage.set(key, json);
    }, [storage, createKeyByPICName, serialize]);

    /**
     * PICDataを読み込む
     */
    const loadPICData = useCallback(async (picName: PICName): Promise<PICData | null> => {
        const key: string = createKeyByPICName(picName);
        const json: string = await storage.get(key);
        if (!json) { return null; }
        const picData: PICData = deserialize(json);
        return picData;
    }, [storage, createKeyByPICName, deserialize]);

    /**
     * PICDataを全て読み込む
     */
    const loadAllPICData = useCallback(async (): Promise<PICData[]> => {
        const picDataArray: PICData[] = [];
        await storage.forEach((value, key) => {
            if (key.includes(PIC_DATA_KEY)) {
                const picData: PICData = deserialize(value);
                picDataArray.push(picData);
            }
        });
        return picDataArray;
    }, [storage, deserialize]);

    /**
     * PICDataを削除する
     */
    const deletePICData = useCallback(async (picName: PICName) => {
        const key: string = createKeyByPICName(picName);
        await storage.remove(key);
    }, [storage, createKeyByPICName]);

    return { savePICData, loadPICData, loadAllPICData, deletePICData };
}