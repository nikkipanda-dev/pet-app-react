import { CardReg } from "./CardReg/CardReg";

export const CardIdx = ({ children, keyID, cardClass, cardStyle }) => {
    return (
        <CardReg 
            keyID={ keyID } 
            cardClass={ cardClass } 
            cardStyle={ cardStyle }
        >
            { children }
        </CardReg>
    )
};
