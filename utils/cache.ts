import AsyncStorage from '@react-native-async-storage/async-storage';
import reactotron from 'reactotron-react-native';

const keyPrefix = 'async-cache';
const expiry_in_mins = 5; 

type CacheObjectParam = Record<string, any>[];

const filterAndMergeArrObj = (obj1: CacheObjectParam, obj2: CacheObjectParam) => {

}

export const setItemInCache = async (key: string, value: any) => {
    try {
        const item = JSON.stringify(value);

        await AsyncStorage.setItem(key, item);
    } catch(error) {
        console.log(error);
    }
}

export const getItemFromCache = async (key: string) => {
    try {
        const item = await AsyncStorage.getItem(key);
        
        return item !== null ? JSON.parse(item) : item;
    } catch (error) {
        console.log(error);
    }
}

export const mergeItemInCache = async (key: string, value: Record<string, any>[]) => {
    try {
        // const existingItems = await getItemFromCache(key);

        // if (existingItems) {
        //     // filterAndMerge()
        // }
        // const ids = value.map((v) => v.id);
        // console.log({ ids })

        // const filteredItems = existingItems.filter((eItem) => !ids.includes(eItem.id));
        // const newItems = [...filteredItems, ...value];

        // console.log({ newItems })

        // await AsyncStorage.mergeItem(key, JSON.stringify(newItems));
    } catch (error: any) {
        // reactotron.error!(error.message, error);
        console.log(error)
    }
}

export const removeItemFromCache = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key, (err) => {
            console.log("remove item ", err);
        })
    } catch (error) {
        console.log(error);
    }
}