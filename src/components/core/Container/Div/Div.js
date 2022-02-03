export const Div = ({ children, divClass, divStyle, hidden }) => {
    return (
        <div 
            className={ divClass } 
            style={{ ...divStyle }} 
            hidden={ hidden }
        >
            { children }
        </div>
    )
};
