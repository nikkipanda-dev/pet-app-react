import Badge from 'react-bootstrap/Badge';

export const BadgeReg = ({ badgeContext }) => {
    return (
        <Badge pill={ badgeContext.isPill }>
            { badgeContext.text }
        </Badge>
    )
};
