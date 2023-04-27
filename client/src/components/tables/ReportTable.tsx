import { Box, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, Typography } from '@mui/material'
import { Column, useTable,  useSortBy, usePagination } from 'react-table'
import Pagination from './utils/Pagination';
import { ArrowDropDown, ArrowDropUp, } from '@mui/icons-material';
import { Stack } from '@mui/system';
import { color1, color2, headColor } from '../../utils/colors';


interface Props {
    data: any[],
    columns: Column<any>[]
}

export function ReportsTable({ data, columns }: Props) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({
        data, columns, initialState: {
            pageSize: 10
        }
    },
        useSortBy,
        usePagination
    )


    return (
        <>
            {/*heading, search bar and table menu */}
            <Stack
                spacing={2}
                padding={1}
                direction="row"
                justifyContent="space-between"
                width="100vw"
            >
                <Typography
                    variant={'h6'}
                    component={'h1'}
                >
                    Reports
                </Typography>
            </Stack>
            {/* table */}
            <Box
                sx={{
                    overflow: "scroll",
                    height: '50vh'

                }}>
                <Table
                    size="small"
                    {...getTableProps()}>
                    <TableHead
                    >
                        {headerGroups.map(headerGroup => (
                            <TableRow  {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map
                                    ((column) => (
                                        <>
                                            <TableCell
                                                sx={{
                                                    minWidth: "150px", bgcolor: headColor,
                                                    textAlign: "center"
                                                }}
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                title=""                                    >
                                                <Stack
                                                    direction="row"
                                                    justifyContent="left"
                                                    alignItems="left"
                                                    spacing={2}
                                                >
                                                    {column.render('Header')}
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? <ArrowDropDown />
                                                            : <ArrowDropUp />
                                                        : ""}

                                                </Stack>
                                            </TableCell>
                                        </>
                                    ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <TableRow sx={{
                                    '&:nth-of-type(odd)': { bgcolor: color1 },
                                    '&:nth-of-type(even)': { bgcolor: color2 },
                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.1)', cursor: 'pointer' }
                                }}

                                    {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell
                                                sx={{ minWidth: "150px", textAlign: "left",pl:2 }}
                                                {...cell.getCellProps()}


                                            >
                                                {cell.render('Cell')}
                                            </TableCell>

                                        )
                                    })}

                                </TableRow>

                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        {footerGroups.map(group => (
                            <tr {...group.getFooterGroupProps()}>
                                {group.headers.map(column => (
                                    <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                                ))}
                            </tr>
                        ))}
                    </TableFooter>
                </Table>
            </Box>
            {/* pagination */}
            <Pagination
                pageIndex={pageIndex}
                pageSize={pageSize}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage} pageOptions={pageOptions}
                pageCount={pageCount}
                gotoPage={gotoPage}
                nextPage={nextPage}
                previousPage={previousPage} setPageSize={setPageSize}
            />

        </>
    )
}