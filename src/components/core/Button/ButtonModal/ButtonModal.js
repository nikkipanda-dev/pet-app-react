import Button from 'react-bootstrap/Button';

export const ButtonModal = ({ text, btnOnclick }) => {

    return (
        <>
            <Button 
                onClick={ () => btnOnclick() } 
            >
                { text }
            </Button>
        </>
    )
};
