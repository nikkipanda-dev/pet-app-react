export const Thumbnail = ({ src, imgClass, imgStyle }) => {
    return (
        <img 
            src={ src } 
            className={ imgClass } 
            style={{ ...imgStyle }}
        />
    )
};