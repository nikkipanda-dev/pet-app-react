export const AnchorReg = ( { anchorContext }) => {

    return (
        <a href={ anchorContext.href } target={ anchorContext.isTargetBlank ? '_blank' : '' }>
            { anchorContext.text }
        </a>
    )
};