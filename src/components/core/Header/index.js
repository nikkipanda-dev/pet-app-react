import { HeaderDefault } from "./HeaderDefault";

export const Header = ({ css, text, headerClass }) => {
    return (
        <HeaderDefault text={ text } headerClass={ headerClass }/>
    )
};

export default Header;