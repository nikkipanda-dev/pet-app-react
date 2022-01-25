import { Anchor } from "../../core/Anchor/AnchorRef/AnchorRef";

export const Navbar = ({ modalShown, modalBtnText, modalOnclick, modalOnhide }) => {    
    return (
        <div 
            className="position-fixed top-0 start-50 translate-middle-x bg-light" 
            style={
                { 
                    width: '100vw',
                }
            }
        >
            <div>I am a navbar</div>
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