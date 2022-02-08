import { Regular } from "./Regular/CardReg";

export const Card = ({ children, cardClass, cardStyle }) => {
    return (
        <Regular 
            // keyID={ keyID } 
            cardClass={ cardClass } 
            cardStyle={ cardStyle }
        >
            { children }
        </Regular>
    )
};

export default Card;