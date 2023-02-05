import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { 
    ListRenderItem, 
    FlatListProps, 
    SectionList, 
    StyleSheet, 
    View, 
    ListRenderItemInfo, 
    SectionListProps, 
    SectionListRenderItem, 
    SectionListData, 
    SectionListRenderItemInfo,
    Text,
    ScrollView,
    Dimensions,
    FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";


import { HomeScreenHeader } from "../../components";
import { HomeNavigationParamList } from "../../types/stackScreen.types";
import { 
    NewReleaseSection, 
    // NewReleaseSectionItem 
} from "./sections/NewReleases";
import { getItemFromCache } from "../../utils/cache";
import { IArtist } from "../../types/artist";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../../api/browse/BrowseAPI";
import { NewReleaseItem, NewReleaseResponse } from "../../api/browse/browse.types";
import { Markets } from "../../types/markets";
import { getManyArtists, getRelatedArtist } from "../../api/artists/ArtistsAPI";
import { firstCharToUpper, isEmpty } from "../../utils/helper";
import { FavouriteArtistSectionItem } from "./sections/FavouriteArtistItem";


type NewReleaseSectionData = SectionListData<NewReleaseItem>;
type FavouriteArtistsData = SectionListData<IArtist>;

// interface HomeScreenSectionData {
//     newRelease: NewReleaseSectionData;
//     favouriteArtists: FavouriteArtistsData;
// }

// interface HomeScreenSectionData {
//     [index: number]: NewReleaseSectionData;
// }

// type HomeScreenSectionData = 

interface ISectionData {
    id: string,
    data: any[][]
}

const formatSectionHeaderText = (text: string) => {
    text = text.replace("-", " ");

    return firstCharToUpper(text);
}


export const HomeScreen = ({ navigation, route }: NativeStackScreenProps<HomeNavigationParamList, 'HomeIndex'>) => {
    // isLoading will be used to render some skeleton or placeholder som sh$% like that

    const [likedArtists, setLikedArtists] = useState<IArtist[] | null>(null);
    const [ deviceCountry, setDeviceCountry ] = useState<Markets[keyof Markets]>("NG");

    let [sectionData, setSectionData] = useState<ISectionData[] | null>(null);

    // useEffect(() => {
    //     let mounted = true;

    //     if (mounted && likedArtists == null) {
    //         (async() => {
    //             const likedArtists: IArtist[] | [] = await getItemFromCache('liked-artists');
    //             console.log('liked artists ', likedArtists)

    //             setLikedArtists(likedArtists);        
    //         })();
    //     }

    //     return () => { mounted = false };
    // }, [likedArtists]);


    // const relatedArtistQueries = useQueries({
    //     queries: likedArtists ? likedArtists.map((seedArtist, index) => {
    //         return {
    //             queryKey: [`fav-artist${index}`, { seedArtistId: seedArtist.id }],
    //             queryFn: () => {
    //                 let seedArtistId = seedArtist.id;
                    
    //                 return getRelatedArtist(seedArtistId, deviceCountry);
    //             },
    //             enabled: !isEmpty(likedArtists)  
    //         }
    //     }): []
    // });
    
    // const requestOneSuccessful = relatedArtistQueries.every((elem) => elem.data !== undefined);
   
    const { data: newReleaseData, isLoading, isError } = useQuery({
        queryKey: ['new-releases', deviceCountry],
        queryFn: () => getNewReleases({ country: deviceCountry, limit: 10 }),
        select: (data: NewReleaseResponse) => {
            
            return data.albums.items;
        },
        // enabled: relatedArtistQueries.every((elem) => elem.data !== undefined)
    })
    
    useEffect(() => {
        if (newReleaseData) {
            setSectionData((prevState) => {
                const newData = { id: 'new-releases', data: [newReleaseData] };

                if (prevState === null) return [newData];
        
                let filtered = prevState.filter((sd) => sd.id !== "new-releases");
                filtered  = filtered.concat(newData);

        
                return filtered;
            });
        }

    }, [newReleaseData])


    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <HomeScreenHeader />

            <SectionList 
                sections={sectionData ? sectionData : []}
                renderItem={(props) => {
                    console.log("LENGTH ", props.section.data[0].length)

                    if (props.section.id === 'new-releases') {
                        return (
                            <NewReleaseSection 
                                data={props.section.data[0]}
                                navigation={navigation} 
                                route={route} 
                            />
                        )
                    }
                    return <></>
                }}
                ItemSeparatorComponent={() => <View style={{ width: 14 }} /> }
                renderSectionHeader={({ section: { id } }) => (
                    <View 
                        style={{
                            marginVertical: 20
                        }}
                    >
                        <Text style={styles.sectionHeader}>{formatSectionHeaderText(id)}</Text>
                    </View>
                )}
            />
           
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 2,
    },
    sectionHeader: {
        color: '#fff', 
        fontSize: 26, 
        fontWeight: '600'
    }
})

{/* <ScrollView>
<HomeScreenHeader />

<View style={{ marginVertical: 20 }}>
    <NewReleaseSection navigation={navigation} route={route} />
</View>

<RelatedArtist artist={li/> 

</ScrollView> */}


            // renderItem: (props: any) => <NewReleaseSectionItem {...props} navigation={navigation} route={route} />



            // return (
            //     <FlatList 
            //         data={props.section.data[0]}
            //         renderItem={(listProps) => {
            //             const { index, item, separators } = listProps;
            //             if (props.section.id === 'new-releases') {
            //                 return (
            //                     <NewReleaseSectionItem 
            //                         item={item}
            //                         index={index}
            //                         separators={separators}
            //                         navigation={navigation} 
            //                         route={route} 
            //                     />
            //                 )
            //             } 
            //         }}
            //         horizontal
            //         ItemSeparatorComponent={() => <View style={{ width: 14}} /> }
            //         />
            //         )