import { useRef } from 'react';

import RoundButton from 'components/atoms/buttons/RoundButton';
import { replaceNullByValue } from 'utils/replaceNullByValue';

import { Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Create, Delete, Info } from '@material-ui/icons';

import useStyles from './styles';

export type ColumnTYPE = {
    title: string;
    value: string;
    align?: string;
    cellSize?: any;
};

interface CustomTableI<TRow extends Record<string, any>> {
    data: Array<any>; //Array<TRow>;
    emptyMessage?: string;
    errorMessage?: string;
    loading?: boolean;
    columns: ColumnTYPE[];
    onDetails?: (rowData: TRow) => void;
    onRowClick?: (rowData: TRow) => void;
    onCancel?: (rowData: TRow) => void;
    onEdit?: (rowData: TRow) => void;
    onDelete?: (rowData: TRow) => void;
    onRefresh?: () => void;
}

const CustomTable: <TRow extends Record<string, any>>(props: CustomTableI<TRow>) => JSX.Element = ({
    data = [],
    columns,
    emptyMessage = 'No data available',
    errorMessage,
    loading,
    onDetails,
    onRowClick,
    onCancel,
    onRefresh,
    onEdit,
    onDelete
}) => {
    const classes = useStyles();
    const tableRef = useRef<HTMLDivElement>();
    replaceNullByValue(data, '-');

    const isActions = typeof onDetails === 'function' || typeof onDelete === 'function' || typeof onEdit === 'function';

    return (
        <TableContainer
            component={Paper}
            style={{ maxHeight: `calc(100vh - 4rem - ${tableRef.current?.offsetTop}px)` }}
            ref={tableRef}
        >
            <Table stickyHeader aria-label="table" style={{ minWidth: '60rem' }}>
                <TableHead>
                    <TableRow>
                        <>
                            {columns.map((el: ColumnTYPE) => (
                                <TableCell key={el.title}>{el.title}</TableCell>
                            ))}
                            <TableCell align="right"></TableCell>
                        </>
                    </TableRow>
                </TableHead>
                {data.length > 0 ? (
                    <TableBody>
                        {data.map((row: any, id: number) => (
                            <TableRow key={id}>
                                <>
                                    {Object.entries(row).map(
                                        ([cellKey, cellValue]: any) =>
                                            columns.find(column => column.value === cellKey) && (
                                                <TableCell
                                                    key={cellKey}
                                                    component="th"
                                                    scope="row"
                                                    size={
                                                        columns.find(column => column.value === cellKey)?.cellSize ??
                                                        'medium'
                                                    }
                                                >
                                                    {cellValue}
                                                </TableCell>
                                            )
                                    )}
                                    {isActions && (
                                        <TableCell align="right" style={{ display: 'flex' }}>
                                            {typeof onDelete === 'function' && (
                                                <RoundButton size="small" handleClick={() => onDelete(row)}>
                                                    <Delete />
                                                </RoundButton>
                                            )}
                                            {typeof onDetails === 'function' && (
                                                <RoundButton size="small" handleClick={() => onDetails(row)}>
                                                    <Info />
                                                </RoundButton>
                                            )}
                                            {typeof onEdit === 'function' && (
                                                <RoundButton size="small" handleClick={() => onEdit(row)}>
                                                    <Create />
                                                </RoundButton>
                                            )}
                                        </TableCell>
                                    )}
                                </>
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <Typography variant="body1" className={classes.noDataBody}>
                        No data found
                    </Typography>
                )}
            </Table>
        </TableContainer>
    );
};
export default CustomTable;
