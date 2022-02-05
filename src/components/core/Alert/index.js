import { Regular } from "./Regular";

export const Alert = ({ children, alertClass }) => {
    return (
        <Regular alertClass={ alertClass }>
            { children }
        </Regular>
    )
};

export default Alert;