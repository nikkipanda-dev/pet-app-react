import Button from 'react-bootstrap/Button';

export const ButtonModal = ({ text, btnOnclick, btnClass }) => {

    return (
        <>
            <Button 
                className={ btnClass }
                onClick={ () => btnOnclick() } 
            >
                { text }
            </Button>
        </>
    )
};
