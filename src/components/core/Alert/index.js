import { AlertReg } from "./AlertReg/AlertReg";

export const AlertIdx = ({ children, alertClass }) => {
    return (
        <AlertReg alertClass={ alertClass }>
            { children }
        </AlertReg>
    )
};
