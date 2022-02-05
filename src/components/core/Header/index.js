import { HeaderDefault } from "./HeaderDefault";

export const Header = ({ text, headerClass }) => {
    return (
        <HeaderDefault text={ text } headerClass={ headerClass }/>
    )
};

export default Header;