import { ContainerIdx } from "../../core/Container";

export const JumbotronIdx = ({ children, jumbotronStyle }) => {
    return (
        <ContainerIdx fluid='true' containerStyle={ jumbotronStyle }>
            { children }
        </ContainerIdx>
    )
};
