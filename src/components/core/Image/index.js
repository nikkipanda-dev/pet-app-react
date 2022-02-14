import { Regular } from './Regular';

export const Image = ({ src, color, size, radius, className, css }) => {
    return (
        <Regular 
        src={ src } 
        className={ className } 
        css={ css }
        radius={ radius }
        color={ color }
        size={ size }/>
    )
};

export default Image;