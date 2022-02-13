import { Regular } from "./Regular";

export const Span = ({ type, className, css, color, text, onClick, dataTarget }) => {
    return (
        (type === 'regular') ?
        <Regular
        text={ text }
        className={ className ? className : ''}
        css={ css }
        color={ color }
        onClick={ onClick } 
        dataTarget={ dataTarget }/>
        : ''
    )
};

export default Span;