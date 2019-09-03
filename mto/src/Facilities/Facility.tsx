import React,  {useState, useEffect, Fragment, useContext} from 'react';
import {FacilityModel} from '../Interfaces/Interfaces';
import { GetFacilities } from '../Data/Facilities';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewIcon from '@material-ui/icons/Pageview';
import FacilityView  from '../Facilities/FacilityView';
import FacilityEdit from './FacilityEdit';
import {UserContext} from '../App';
import { Redirect } from 'react-router-dom';
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

export interface IFacilityViewState{
    openDialog: boolean,
    facilityInfo: FacilityModel
}
const Facility = () => {
    const userContext = useContext(UserContext);
    console.log(userContext[0])
    const classes = useStyles();
    const [facilities, setFacilities] = useState<Array<FacilityModel>>([]);
    const [facilityView, setFacilityView] = useState<IFacilityViewState>({
         openDialog: false,
         facilityInfo: {
            id: 0,
            name: '',
            description: '',
            companyId: 0,
            code: ''    
         }
    });

    const [facilityEdit, setFacilityEdit] = useState<IFacilityViewState>({
        openDialog: false,
        facilityInfo: {
           id: 0,
           name: '',
           description: '',
           companyId: 0,
           code: ''    
        }
   });

    useEffect(() => {
        const list: FacilityModel[] = GetFacilities.filter(c => c.companyId === userContext[0].companyId);
        setFacilities(list);
        }, [GetFacilities.length]);

    const viewDetail = (id: number) => {
        const facilityDetail: FacilityModel | undefined = GetFacilities.find(c => c.id === id);
        setFacilityView({
            ...facilityView,
            openDialog: true,
            facilityInfo: facilityDetail as FacilityModel
        })
    }

    const closeDlgView = () => {
        setFacilityView({
            ...facilityView,
            openDialog: false
        })
    }

    const handleAddEditSubmit = (fac: FacilityModel) => {
        fac.id = facilities.length + 1;
        const list = facilities.concat(fac);
        setFacilities(
            list
        )
    }

    const openNewFacility = () => {
        setFacilityEdit({
            openDialog: true,
            facilityInfo: {
               id: 0,
               name: '',
               description: '',
               companyId: 0,
               code: ''    
            }
        })
    }

    const closeDlgEdit = () => {
        setFacilityEdit({
            ...facilityView,
            openDialog: false
        })
    }

    const openEdit = (id: number) => {
        const facilityDetail: FacilityModel | undefined= GetFacilities.find(c => c.id === id);
        setFacilityEdit({
            ...facilityDetail ,
            openDialog: true,
            facilityInfo: facilityDetail as FacilityModel
        })
    }

    const handleDelete = (item: FacilityModel) => {
        console.log('item to delete', item)

    }

    const showFacilityScreen = () => {
        return(<Fragment>
            {userContext[0].isLogged}
            <Paper style={{ display: 'flex', padding: '5px'}}>
                <Typography variant="h4" style={{flexGrow: 1}} >
                    Facilities
                </Typography>
                <Button variant="contained" color="primary" onClick={openNewFacility} disabled={userContext[0].role !== 'admin'}>
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
                                <TableCell><IconButton onClick={() => viewDetail(row.id)}><PageviewIcon/></IconButton></TableCell>
                                <TableCell><IconButton disabled={userContext[0].role !== 'admin'} onClick={() => openEdit(row.id)}><EditIcon/></IconButton></TableCell>
                                <TableCell><IconButton onClick={() => handleDelete(row)}><DeleteIcon/></IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
             </Paper>
             <FacilityView openDialog={facilityView.openDialog} handleCloseDialog={closeDlgView} facilityInfo={facilityView.facilityInfo} />
             <FacilityEdit  openDialog={facilityEdit.openDialog} handleSubmit={handleAddEditSubmit} handleCloseDialog={closeDlgEdit} id={facilityEdit.facilityInfo.id} />              
        </Fragment>
        );
    }
    return(<Fragment>
        {userContext[0].isLogged? showFacilityScreen() : (<Redirect to="/home" />)}
        </Fragment>
    )}; 

export default Facility;