import { 
    Dimensions,
    Image, 
    ListRenderItemInfo, 
    Text, 
    View
} from "react-native";

import { ArtistData } from "../../types/artist.types";


interface LikedArtistsProps extends ListRenderItemInfo<ArtistData> {
    numColumns: 1 | 2
}

export const LikedArtists = ({ item, index, numColumns }: LikedArtistsProps) => {
    const { width } = Dimensions.get("window");

    console.log({ numColumns })

    return (
        <>
            {numColumns === 1 ? 
                (
                    <View
                        style={{
                            flexDirection: numColumns === 1 ? 'row' : 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Image 
                            source={{ uri: item.images[0].url }}
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: 45,
                            }}
                        />

                        <View style={{ marginLeft: 10}}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    fontWeight: 'normal',
                                }} 
                            >
                                {item.artist}
                            </Text>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    opacity: .6,
                                }} 
                            >
                                Artist
                            </Text>
                        </View>
                    </View>
                ) : 
                (
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <Image 
                            source={{ uri: item.images[0].url }}
                            style={{
                                width: ((width / 2) - 20),
                                height: ((width / 2) - 20),
                                borderRadius: (((width / 2) - 20) / 2),
                            }}
                        />

                        <View style={{ marginTop: 6 }}>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 14,
                                    fontWeight: 'normal',
                                }} 
                            >
                                {item.artist}
                            </Text>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    opacity: .6,
                                    textAlign: 'center'
                                }} 
                            >
                                Artist
                            </Text>
                        </View>
                    </View>
                ) 
            }
        </>
    )
}