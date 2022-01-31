export const Textarea = ({ textareaClass, rows, value, onChange }) => {
    return (
        <textarea 
            className={ textareaClass } 
            onChange={ evt => onChange(evt.target.value) } 
            rows={ rows }
            value={ value }>
        </textarea>
    )
};
