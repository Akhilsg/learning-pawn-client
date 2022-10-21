import React from 'react'

//Material-ui/core
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Typography, 
  IconButton, 
  DialogActions
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from "./styles"

const Popup = ({ title, children, outerChildren, openPopup, setOpenPopup }) => {
  const classes = useStyles();

  return (
    <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1, margin: 'auto' }}>
            {title}
          </Typography>
          <IconButton
            onClick={() => {
              setOpenPopup(false)
            }}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      <DialogActions>
        {outerChildren}
      </DialogActions>
    </Dialog>
  )
}

export default Popup;
