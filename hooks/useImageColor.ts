import ImageColors from 'react-native-image-colors';


export const useImageColor = async (uri: string) => {
    const result = await ImageColors.getColors(uri, {
        fallback: '#228B22',
        cache: true,
        key: uri,
    })

    console.log(result.platform);
   
    switch (result.platform) {
        case 'android':
            return result.vibrant
        case 'web':
            return result.lightVibrant
        case 'ios':
            return result.primary
        default:
            throw new Error('Unexpected platform key')
    }

}