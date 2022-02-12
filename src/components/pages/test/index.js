import Button from '../../core/Button/index.js';

export const Test = () => {
    return (
        <div style={{ paddingTop: '10rem' }}>
            <Button type='regular'>Button</Button>
            <Button type='regular' btnClass='test-class' color='violet' text='hello world'/>
        </div>
    )
};

export default Test;