import React from 'react';
import {FacilityModel} from '../Interfaces/Interfaces';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


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
    });

export interface DialogHeaderProps extends WithStyles<typeof styles>{
    id: string,
    children: React.ReactNode,
    onClose: () => void
}

export interface IFacilityDialogViewProps {
    openDialog: boolean,
    facilityInfo: FacilityModel,
    handleCloseDialog: () => void
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
  

const FacilityView = (props: IFacilityDialogViewProps) => {
    const {openDialog, facilityInfo, handleCloseDialog} = props; 

    const handleClose = () => {
        handleCloseDialog();
    }
    return (
            <div style={{width:'600px'}}>
              <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Facility Details
                </DialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    Id: {facilityInfo.id}
                  </Typography>
                  <Typography gutterBottom>
                   Name: {facilityInfo.name}
                  </Typography>
                  <Typography gutterBottom>
                   Description: {facilityInfo.description}
                  </Typography>
                  <Typography gutterBottom>
                   Code: {facilityInfo.code}
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
        );

}

export default FacilityView;