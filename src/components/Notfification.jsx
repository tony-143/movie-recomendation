import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Custom Alert component for styling
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Notification({ open, message, onClose }) {
    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
            <Alert onClose={onClose} severity="info" sx={{ backgroundColor: 'black', color: 'white' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Notification;
