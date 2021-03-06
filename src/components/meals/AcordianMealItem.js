import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    food_details: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            padding: '0px'
        }
    },
    table: {
        [theme.breakpoints.down('xs')]: {
            maxWidth: '327px',
            overflow: 'hidden',
        }
    }
}));

export default function AcordianMealItem({ meal }) {
    const classes = useStyles();

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{`${meal.name} (total Calories: ${meal.total_cal})`}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.food_details}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Calories</TableCell>

                            <TableCell align="right">Fat&nbsp;(g)</TableCell>

                            <Hidden xsDown>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            </Hidden>

                            <TableCell align="right">Protein&nbsp;(g)</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meal.foods.map((food) => (
                            <TableRow key={food.id}>
                                <TableCell component="th" scope="row">
                                    {food.name}
                                </TableCell>
                                <TableCell align="right">{food.total_cal}</TableCell>

                                <TableCell align="right">{food.total_fat}</TableCell>


                                <Hidden xsDown>
                                    <TableCell align="right">{food.total_carbs}</TableCell>
                                </Hidden>

                                <TableCell align="right">{food.protein}</TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AccordionDetails>
        </Accordion>
    )
}
