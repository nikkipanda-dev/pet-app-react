import Btn from "react-bootstrap/Button";

export const Button = ({ text, isModal, modalOnhide, type, btnClass }) => {
    return (
        <Btn 
            type={ type } 
            onClick={ isModal ? () => modalOnhide() : '' }
            className={ btnClass }
        >
            { text }
        </Btn>
    )
};
