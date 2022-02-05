import Button from 'react-bootstrap/Button';

export const Modal = ({ text, btnOnclick, btnClass, btnStyle, targetID }) => {

    return (
        <>
            <Button 
                className={ btnClass }
                onClick={ (evt) => btnOnclick(evt) } 
                data-target-id={ targetID } 
                style={{ ...btnStyle }}
            >
                { text }
            </Button>
        </>
    )
};