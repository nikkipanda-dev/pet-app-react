import { ImageThumbnail } from './ImageThumbnail/ImageThumbnail';

export const ImgIdx = ({ imgContext }) => {
    return (
        (imgContext.type === 'thumbnail') ? <ImageThumbnail /> : <>Not thumbnail</>
    )
};