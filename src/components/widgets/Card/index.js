import { CardReg } from "./CardReg/CardReg";

export const CardIdx = ({ children, cardClass, cardStyle }) => {
    return (
        <CardReg cardClass={ cardClass } cardStyle={ cardStyle }>
            { children }
        </CardReg>
    )
};
