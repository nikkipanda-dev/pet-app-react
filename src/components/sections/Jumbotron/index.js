import { ContainerIdx } from "../../core/Container";

export const JumbotronIdx = ({ children, jumbotronClass, jumbotronStyle }) => {
    return (
        <ContainerIdx fluid='true' containerClass={ jumbotronClass } containerStyle={ jumbotronStyle }>
            { children }
        </ContainerIdx>
    )
};
