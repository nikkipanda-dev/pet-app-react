export const SpanReg = ({ text, spanClass, spanStyle, spanOnclick, dataTarget }) => {
    return (
        <span
            className={spanClass}
            style={{ ...spanStyle }}
            { ...spanOnclick && { onClick: evt => spanOnclick(evt) }}
            data-target={ dataTarget }>
            
            {text}
        </span>
    )
};
