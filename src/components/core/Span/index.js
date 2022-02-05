import { Regular } from "./Regular";

export const Span = ({ type, spanClass, spanStyle, text, spanOnclick, dataTarget }) => {
    return (
        (type === 'regular') ?
            <Regular
                text={ text }
                spanClass={ spanClass ? spanClass : ''}
                spanStyle={ spanStyle }
                spanOnclick={ spanOnclick } 
                dataTarget={ dataTarget }/>
            : ''
    )
};

export default Span;