import { styled } from '../../../../css/stitches.config';

const Input = styled('input', {
    transition: 'all .1s',
    padding: '5px',
    '$:focus': {
        transition: 'all .1s',
        border: '1px solid red',
        outline: 'unset',
    }
});

export const Regular = ({ css, color, size, type, className, refTarget, hidden, name, onChange, defaultValue, value }) => {
    return (
        <Input 
        type={ type } 
        css={{ ...css }}
        color={ color }
        size={ size }
        className={ className } 
        ref={ refTarget } 
        name={ name } 
        // { ...onChange && { onChange: evt => onChange(evt.target.value) }} 
        // { ...value && { value: value }} 
        { ...defaultValue && { defaultValue: defaultValue }}
        hidden={ hidden }/>
    )
};
