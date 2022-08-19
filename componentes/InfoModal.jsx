
import { useState } from 'react';
import { Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


export default function InfoModal(props) {
    const [show, setShow] = useState(true);
    const toggle = () => setShow(!show);

    return  <>
            <Dialog open={show} onClose={toggle}>
                <DialogTitle>Informação</DialogTitle>
                <DialogContent>
                    <span>{props.children}</span>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={toggle}>Close</Button>
                </DialogActions>
            </Dialog>
		</>;
}
