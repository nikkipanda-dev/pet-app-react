export const Regular = ({ text, type, btnClass, btnOnclick, isShown, targetID }) => {
    return (
        <button 
        className={ btnClass } 
        type={ type } 
        { ...btnOnclick && { onClick: evt => btnOnclick(evt) }}
        data-is-shown={ isShown } 
        data-target-id={ targetID }>
            { text }
        </button>
    )
};
