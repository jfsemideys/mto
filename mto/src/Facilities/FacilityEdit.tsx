import React, { useState, useEffect } from 'react';
import {FacilityModel} from '../Interfaces/Interfaces';
import { Button, AppBar, Toolbar, TextField } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { GetFacilities } from '../Api/Facilities';

const styles = (theme: Theme) => 
    createStyles({
        root:{
            margin: 0,
            padding: theme.spacing(2),
            backgroundColor:'blue'
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    });

export interface DialogHeaderProps extends WithStyles<typeof styles>{
    id: string,
    children: React.ReactNode,
    onClose: () => void
}

export interface IFacilityDialogViewProps extends WithStyles<typeof styles> {
    openDialog: boolean,
    id: number,
    handleCloseDialog: () => void,
    handleSubmit: (fac: FacilityModel) => void
}

export interface IFacilityState {
    facilityInfo: FacilityModel
}

const DialogTitle = withStyles(styles)((props: DialogHeaderProps) => {
    const {children, classes, onClose} = props;
   
    return (
        <MuiDialogTitle style={{padding: '0px', width: '600px'}}>
          <AppBar position="static">
            <Toolbar>
            <Typography>
                {children}
            </Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
                </IconButton>
                ) : null
            }
            </Toolbar>
            </AppBar>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme: Theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);
  

const FacilityEdit = withStyles(styles)((props: IFacilityDialogViewProps) => {
    const {openDialog, classes, id, handleCloseDialog} = props; 

    const [facility, setFacility] = useState<FacilityModel>(
        {
            id: 0,
            name: '',
            description: '',
            companyId: 1,
            code: '', 
        }
    );

    useEffect(() => {
        GetFacilities()
          .then(facilityList  => {
            let facilityItem: FacilityModel | any= facilityList.find(c => c.id === id);
            setFacility( prev => ({
              ...facilityItem
          }));
        });
    },[openDialog]);

    const handleClose = () => {
        handleCloseDialog();
    }

    const handleSubmit = () => {
        
        // if(id === 0) {
        //     setFacility(prev => ({
        //         ...prev,
        //         id: GetFacilities.length + 1
        //     }))
        //     GetFacilities.push(facility);
        //     console.log(facility);
        // }
        console.log('Facility Edit handleSubmit')
       props.handleSubmit(facility);

        handleCloseDialog();
    }

    const handleChange = (name: keyof FacilityModel) => (event: React.ChangeEvent<HTMLInputElement>)  => {
        const value = event.target.value; 
        setFacility((prev: FacilityModel) => ({
            ...prev,
            [name] : value
        }));
    }
    return (
            <div style={{width:'600px'}}>
              <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Facility Details
                </DialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Id: {id}
                  </Typography>
                  <TextField
                    id="standard-name"
                    label="Name"
                    className={classes.textField}
                    value={facility.name || ''}
                    onChange={handleChange('name')}
                    margin="normal"
                />
                 <TextField
                    id="standard-name"
                    label="Description"
                    className={classes.textField}
                    value={facility.description || ''}
                    onChange={handleChange('description')}
                    margin="normal"
                />
                 <TextField
                    id="standard-name"
                    label="Code"
                    className={classes.textField}
                    value={facility.code || ''}
                    onChange={handleChange('code')}
                    margin="normal"
                />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          );

});

export default FacilityEdit;