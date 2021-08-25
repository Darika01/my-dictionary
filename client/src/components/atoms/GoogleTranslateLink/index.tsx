import { Link } from '@material-ui/core';

interface GoogleTranslateLinkProps {
    value: string;
    className?: any;
}

const GoogleTranslateLink: React.FC<GoogleTranslateLinkProps> = ({ children, value, className }) => {
    return (
        <Link
            href={`https://translate.google.ru/?sl=en&tl=pl&text=${value}&op=translate`}
            target="_blank"
            rel="noreferrer"
            className={className}
        >
            {children}
        </Link>
    );
};

export default GoogleTranslateLink;
