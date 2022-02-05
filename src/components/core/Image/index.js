import { Thumbnail } from './Thumbnail';

export const Image = ({ src, imgClass, imgStyle }) => {
    return (
        <Thumbnail 
            src={ src } 
            imgClass={ imgClass } 
            imgStyle={ imgStyle }
        />
    )
};

export default Image;