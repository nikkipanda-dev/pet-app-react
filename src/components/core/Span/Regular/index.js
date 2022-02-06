export const Regular = ({ text, spanClass, spanStyle, spanOnclick, dataTarget }) => {
    return (
        <span
            className={spanClass}
            style={{ ...spanStyle }}
            { ...spanOnclick && { onClick: evt => spanOnclick(evt) }}
            { ...dataTarget && { dataTarget: dataTarget }}>
            
            {text}
        </span>
    )
};
