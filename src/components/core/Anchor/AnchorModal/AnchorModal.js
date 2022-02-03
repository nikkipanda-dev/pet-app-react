import { ModalIdx } from '../../../widgets/Modal';

export const AnchorModal = ({ text, anchorOnclick, anchorClass, dataTargetUserId, dataTargetPostId, dataTargetBody }) => {
    return (
        <a 
            onClick={ evt => anchorOnclick(evt) } 
            className={ anchorClass } 
            data-target-user-id={ dataTargetUserId } 
            data-target-post-id={ dataTargetPostId } 
            data-target-body={ dataTargetBody }
        >
            { text }
        </a>
    )
};
