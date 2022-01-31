import { AlertReg } from "./AlertReg/AlertReg";

export const AlertIdx = ({ children, alertClass }) => {
    console.log('children: ', { children })

    return (
        <AlertReg alertClass={ alertClass }>
            { children }
        </AlertReg>
    )
};
