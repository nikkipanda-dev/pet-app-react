export const Thumbnail = ({ src, className, style }) => {
    return (
        <img 
            src={ src } 
            className={ className } 
            style={{ ...style }}
        />
    )
};