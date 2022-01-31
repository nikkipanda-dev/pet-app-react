// import Btn from "react-bootstrap/Button";

export const ButtonReg = ({ text, type, btnClass, btnOnclick }) => {
    return (
        <button className={ btnClass } type={ type }>
            { text }
        </button>
    )
};
