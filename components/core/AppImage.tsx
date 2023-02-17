import { Image, ImageProps, StyleProp } from "react-native";

import AlbumDefaultImage from "../../assets/images/albumDefaultImage.png";
import ArtistDefaultImage from "../../assets/images/artistDefaultImage.jpg";


interface AppImageProps {
    customStyle?: StyleProp<Image>;
    src: string;
    otherProps?: ImageProps;
    imageType: "album" | "artist"; 
}

export const AppImage = ({ imageType, src, otherProps }: AppImageProps) => {

    return (
        <Image 
            {...otherProps}
            source={{ uri: src }}
            defaultSource={imageType === "album" ? AlbumDefaultImage : ArtistDefaultImage}
            style={{
                width: 64,
                height: 64
            }}
        />
    )
}