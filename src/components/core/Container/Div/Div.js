export const Div = ({ children, divClass, divStyle, hidden, refTarget }) => {
    return (
        <div 
            className={ divClass } 
            style={{ ...divStyle }} 
            hidden={ hidden }
            ref={ refTarget }
        >
            { children }
        </div>
    )
};
