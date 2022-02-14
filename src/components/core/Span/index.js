import { Regular } from "./Regular";

export const Span = ({ type, className, css, color, text, size, onClick, dataTarget }) => {
    return (
        (type === 'regular') ?
        <Regular
        text={ text }
        className={ className ? className : ''}
        css={ css }
        size={ size }
        color={ color }
        onClick={ onClick } 
        dataTarget={ dataTarget }/>
        : ''
    )
};

export default Span;