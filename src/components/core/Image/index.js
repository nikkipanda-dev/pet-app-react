import { Thumbnail } from './Thumbnail';

export const Image = ({ src, className, style }) => {
    return (
        <Thumbnail 
            src={ src } 
            className={ className } 
            style={ style }
        />
    )
};

export default Image;