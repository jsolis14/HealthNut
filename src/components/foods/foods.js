import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';
import TableHead from '@material-ui/core/TableHead';
import Hidden from '@material-ui/core/Hidden';
import FoodFormModal from './FoodFormModal';
import { useDispatch, useSelector } from "react-redux";
import { thunks } from '../../store/foods';
import { useAuth0 } from '../../react-auth0-spa';

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();

    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };


    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>

        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function CustomPaginationActionsTable() {
    const classes = useStyles2();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const foods = useSelector((state) => state.foods.foods);
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, foods.length - page * rowsPerPage);
    const { user, getTokenSilently } = useAuth0();

    const dispatch = useDispatch();
    async function fetchReq() {
        if (foods.length === 0 && user) {

            const userId = user.id
            const token = await getTokenSilently()

            dispatch(thunks.getFoods(userId, token))
        }
    }

    useEffect(() => {
        fetchReq()
    }, [user])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <Hidden mdDown>
                                <TableCell align="right">Sat Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Trans Fat&nbsp;(g)</TableCell>
                            </Hidden>
                            <Hidden smDown>
                                <TableCell align="right">Cholesterol&nbsp;(mg)</TableCell>
                            </Hidden>
                            <Hidden xsDown>
                                <TableCell align="right">Sodium&nbsp;(mg)</TableCell>
                            </Hidden>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <Hidden smDown>
                                <TableCell align="right">Fiber&nbsp;(g)</TableCell>
                            </Hidden>
                            <Hidden xsDown>
                                <TableCell align="right">Sugar&nbsp;(g)</TableCell>
                            </Hidden>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? foods.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : foods
                        ).map((food) => (
                            <TableRow key={food.name}>
                                <TableCell component="th" scope="food">
                                    {food.name}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {food.total_cal}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {food.total_fat}
                                </TableCell>
                                <Hidden mdDown>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {food.saturated_fat}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {food.trans_fat}
                                    </TableCell>
                                </Hidden>
                                <Hidden smDown>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {food.cholesterol}
                                    </TableCell>
                                </Hidden>
                                <Hidden xsDown>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {food.sodium}
                                    </TableCell>
                                </Hidden>
                                <TableCell style={{ width: 160 }} align="right">
                                    {food.total_carbs}
                                </TableCell>
                                <Hidden smDown>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {food.dietary_fiber}
                                    </TableCell>
                                </Hidden>
                                <Hidden xsDown>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {food.sugars}
                                    </TableCell>
                                </Hidden>
                                <TableCell style={{ width: 160 }} align="right">
                                    {food.protein}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={foods.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />


                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <FoodFormModal />
        </div>
    );
}
