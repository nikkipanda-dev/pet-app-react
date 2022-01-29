import Btn from "react-bootstrap/Button";

export const ButtonReg = ({ text, type, btnClass, btnOnclick }) => {
    return (
        <Btn className={ btnClass } type={ type }>
            { text }
        </Btn>
    )
};
