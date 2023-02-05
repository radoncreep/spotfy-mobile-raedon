import AsyncStorage from '@react-native-async-storage/async-storage';


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

export const removeItemFromCache = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key, (err) => {
            console.log("remove item ", err);
        })
    } catch (error) {
        console.log(error);
    }
}