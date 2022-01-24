import { Anchor } from "../core/Anchor";

export const Navbar = ({ modalShown, modalBtnText, modalOnclick, modalOnhide }) => {    
    return (
        <div className="position-fixed top-0 start-50 translate-middle-x bg-warning m-1">
            <Anchor 
                text={ modalBtnText } 
                data-bs-toggle="modal" 
                role="button" 
                modalOnclick={ modalOnclick } 
                modalOnhide={ modalOnhide }
                modalShown={ modalShown }
            />
        </div>
    );
};