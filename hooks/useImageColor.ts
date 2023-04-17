import { useEffect, useState } from 'react';
import ImageColors from 'react-native-image-colors';
import { ColorState } from '../types/shared';


const initialState: ColorState = {
    colorOne: { value: '', name: '' },
    colorTwo: { value: '', name: '' },
    colorThree: { value: '', name: '' },
    colorFour: { value: '', name: '' },
    // rawResult: '',
}

export const useImageColor = (uri: string) => {
    const [derivedImageColors, setDerivedImageColors] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let mounted = true;

        const fetchColors = async () => {
            try {
                const result = await ImageColors.getColors(uri, {
                  fallback: '#000000',
                  quality: 'low',
                  pixelSpacing: 5,
                  cache: true,
                  headers: {
                    authorization: 'Basic 123',
                  },
                })
          
                switch (result.platform) {
                  case 'android':
                    setDerivedImageColors({
                      colorOne: { value: result.lightVibrant ?? "", name: 'lightVibrant' },
                      colorTwo: { value: result.dominant ?? "", name: 'dominant' },
                      colorThree: { value: result.vibrant ?? "", name: 'vibrant' },
                      colorFour: { value: result.darkVibrant ?? "", name: 'darkVibrant' },
                    //   rawResult: JSON.stringify(result),
                    })
                    break
                  case 'ios':
                    setDerivedImageColors({
                      colorOne: { value: result.background, name: 'background' },
                      colorTwo: { value: result.detail, name: 'detail' },
                      colorThree: { value: result.primary, name: 'primary' },
                      colorFour: { value: result.secondary, name: 'secondary' },
                    //   rawResult: JSON.stringify(result),
                    })
                    break
                  default:
                    throw new Error('Unexpected platform')
                }
          
                setLoading(false)
                
            } catch (error) {
                console.log({error})
            }
        }
        
        if (mounted) {
            fetchColors();
        }

        return () => { mounted = false; }
    }, [uri])

    if (loading) {
        console.log("image color loading");
    }

    // console.log({ derivedImageColors });

    return derivedImageColors;
}