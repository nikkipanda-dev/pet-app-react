export const ImageThumbnail = ({ src, imgClass, imgStyle }) => {
    return (
        <img 
            src={ src } 
            className={ imgClass } 
            style={{ ...imgStyle }}
        />
    )
};