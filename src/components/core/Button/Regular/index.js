export const Regular = ({ text, type, btnClass, btnOnclick }) => {
    return (
        <button className={ btnClass } type={ type } { ...btnOnclick && { onClick: btnOnclick } }>
            { text }
        </button>
    )
};
