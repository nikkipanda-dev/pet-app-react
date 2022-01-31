import { ImageThumbnail } from './ImageThumbnail/ImageThumbnail';

export const ImgIdx = ({ src, imgClass, imgStyle }) => {
    return (
        <ImageThumbnail src={ src } imgClass={ imgClass } imgStyle={ imgStyle }/>
    )
};