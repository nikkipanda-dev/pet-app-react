export const Regular = ({ text, type, btnClass, btnOnclick }) => {
    return (
        <button className={ btnClass } type={ type }>
            { text }
        </button>
    )
};
