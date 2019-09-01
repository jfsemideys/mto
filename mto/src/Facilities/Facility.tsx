import React,  {useState, useEffect, Fragment} from 'react';
import {FacilityModel} from '../Interfaces/Interfaces';
import { GetFacilities } from '../Data/Facilities';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewIcon from '@material-ui/icons/Pageview';
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: '20px',
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
      
    },
  }));
const Facility = () => {
    const classes = useStyles();
    const [facilities, setFacilities] = useState<Array<FacilityModel>>([]);

    useEffect(() => {
        const list: FacilityModel[] = GetFacilities.filter(c => c.companyId === 1);
        setFacilities(facilities.concat(list));
        }, []);

    return(<Fragment>
        <Paper style={{ display: 'flex', padding: '5px'}}>
            <Typography variant="h4" style={{flexGrow: 1}} >
                Facilities
            </Typography>
            <Button variant="contained" color="primary" >
                Create Facility
                <AddIcon style={{marginLeft:'10px'}}></AddIcon>
            </Button>
        </Paper>
        <Paper className={classes.root}>
            <Table className={classes.table} >
                <TableHead>
                    <TableRow color="primary">
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>View</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {facilities.map(row => (
                        <TableRow key={row.id} >
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.code}</TableCell>
                            <TableCell><IconButton><PageviewIcon/></IconButton></TableCell>
                            <TableCell><IconButton><EditIcon/></IconButton></TableCell>
                            <TableCell><IconButton><DeleteIcon/></IconButton></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
         </Paper>)
    </Fragment>
    )}; 

export default Facility;