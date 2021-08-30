import { useEffect, useRef, useState } from 'react';

import RoundButton from 'components/atoms/buttons/RoundButton';
import { replaceNullByValue } from 'utils/replaceNullByValue';

import { Paper, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
    Create,
    Delete,
    Info,
    PlayCircleFilled,
    Visibility,
    VisibilityOff
} from '@material-ui/icons';

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
    onPlayAudio?: (rowData: TRow) => void;
    visibilityCol?: string;
}

const CustomTable: <TRow extends Record<string, any>>(props: CustomTableI<TRow>) => JSX.Element = ({
    data = [],
    columns,
    onDetails,
    onPlayAudio,
    onEdit,
    onDelete,
    visibilityCol
}) => {
    const classes = useStyles();
    const tableRef = useRef<HTMLDivElement>();
    const [ItemVisibility, setItemVisibility] = useState<{ [k: string]: boolean }>({});

    useEffect(() => {
        setItemVisibility({
            ...ItemVisibility,
            [data[0]?.id]: true
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    replaceNullByValue(data, '-');

    const isActions =
        typeof onDetails === 'function' ||
        typeof onDelete === 'function' ||
        typeof onEdit === 'function' ||
        typeof onPlayAudio === 'function';

    const sortedData = data.map(row => {
        return Object.entries(row)
            .sort((a: any, b: any) => {
                const keyA = columns.findIndex(col => col.value === a[0]),
                    keyB = columns.findIndex(col => col.value === b[0]);
                if (keyA < keyB && keyA >= 0 && keyB >= 0) return -1;
                if (keyA > keyB && keyA >= 0 && keyB >= 0) return 1;
                return 0;
            })
            .reduce(
                (_sortedObj, key: any) => ({
                    ..._sortedObj,
                    [key[0]]: key[1]
                }),
                {}
            );
    });

    const setAllVisible = () => {
        const allVisible = Object.values(ItemVisibility).find(val => val);
        allVisible
            ? setItemVisibility({})
            : setItemVisibility(() => {
                  const items: { [k: string]: boolean } = {};
                  sortedData.forEach((el: any) => {
                      items[el.id] = true;
                  });
                  return { ...items };
              });
    };

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
                            <TableCell align="left">
                                {sortedData.length > 0 ? (
                                    <RoundButton size="small" handleClick={setAllVisible}>
                                        {Object.keys(ItemVisibility).some(key => {
                                            const row = sortedData.find((row: any) => row.id === key);

                                            // @ts-ignore
                                            return row ? ItemVisibility[row.id] : false;
                                        }) ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </RoundButton>
                                ) : null}
                            </TableCell>
                            {columns.map((column: ColumnTYPE) => (
                                <TableCell key={column.title}>{column.title}</TableCell>
                            ))}
                            <TableCell align="right"></TableCell>
                        </>
                    </TableRow>
                </TableHead>
                {sortedData.length > 0 ? (
                    <TableBody>
                        {sortedData.map((row: any, id: number) => (
                            <TableRow key={id}>
                                <>
                                    <TableCell component="th" align="left">
                                        <RoundButton
                                            size="small"
                                            handleClick={() =>
                                                setItemVisibility({
                                                    ...ItemVisibility,
                                                    [row.id]: !ItemVisibility[row.id]
                                                })
                                            }
                                        >
                                            {ItemVisibility[row.id] ? <Visibility /> : <VisibilityOff />}
                                        </RoundButton>
                                    </TableCell>
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
                                                    className={
                                                        !ItemVisibility[row.id] && cellKey === visibilityCol
                                                            ? classes.visibilityOff
                                                            : ''
                                                    }
                                                >
                                                    {cellValue}
                                                </TableCell>
                                            )
                                    )}
                                    {isActions && (
                                        <TableCell component="th" align="right">
                                            <div className={classes.actions}>
                                                {typeof onPlayAudio === 'function' && row.isAudio && (
                                                    <RoundButton size="small" handleClick={() => onPlayAudio(row)}>
                                                        <PlayCircleFilled />
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
                                                {typeof onDelete === 'function' && (
                                                    <RoundButton size="small" handleClick={() => onDelete(row)}>
                                                        <Delete />
                                                    </RoundButton>
                                                )}
                                            </div>
                                        </TableCell>
                                    )}
                                </>
                            </TableRow>
                        ))}
                    </TableBody>
                ) : (
                    <caption>
                        <Typography variant="body1" className={classes.noDataBody}>
                            No data found
                        </Typography>
                    </caption>
                )}
            </Table>
        </TableContainer>
    );
};
export default CustomTable;
