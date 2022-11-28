import { styled } from '@mui/system';

export const TableHeader = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    '& > div': {
        display: 'flex',
        alignItems: 'baseline'
    }
});
