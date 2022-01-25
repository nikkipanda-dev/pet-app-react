export const AnchorReg = ( { anchorContext }) => {
    return (
        <a href={ anchorContext.href } target='_blank'>
            { anchorContext.text }
        </a>
    )
};