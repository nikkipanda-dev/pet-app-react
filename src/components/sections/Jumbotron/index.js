import { ContainerIdx } from "../../core/Container";

export const JumbotronIdx = ({ children }) => {
    const jumobtronStyle = {
        'minHeight': '30vh',
    }

    return (
        <ContainerIdx fluid='md' containerStyle={ jumobtronStyle }>
            { children }
        </ContainerIdx>
    )
};
