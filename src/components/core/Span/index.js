import { SpanReg } from "./SpanReg/SpanReg";

export const Span = ({ type, spanClass, spanStyle, text, spanOnclick, dataTarget }) => {
    return (
        (type === 'regular') ?
            <SpanReg
                text={ text }
                spanClass={ spanClass ? spanClass : ''}
                spanStyle={ spanStyle }
                spanOnclick={ spanOnclick } 
                dataTarget={ dataTarget }/>
            : ''
    )
};

export default Span;