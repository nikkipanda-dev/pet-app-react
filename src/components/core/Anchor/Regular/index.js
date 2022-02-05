export const Regular = ( { text, href, isTargetBlank, anchorClass, anchorOnclick }) => {

    return (
        <a href={ href } className={ anchorClass } target={ isTargetBlank ? '_blank' : '' } >
            { text }
        </a>
    )
};