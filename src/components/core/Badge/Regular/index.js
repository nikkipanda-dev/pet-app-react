import Badge from 'react-bootstrap/Badge';

export const Regular = ({ badgeContext }) => {
    return (
        <Badge pill={ badgeContext.isPill }>
            { badgeContext.text }
        </Badge>
    )
};
