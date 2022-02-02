export const AnchorReg = ( { text, href, isTargetBlank, anchorClass }) => {

    return (
        <a href={ href } className={ anchorClass } target={ isTargetBlank ? '_blank' : '' }>
            { text }
        </a>
    )
};