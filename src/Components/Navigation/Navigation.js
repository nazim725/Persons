import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import AddPerson from '../AddPerson/AddPerson';

export default function Navigation() {
    const [openBooking, setBookingOpen] = React.useState(false);
    const handleBookingOpen = () => setBookingOpen(true);
    const handleBookingClose = () => setBookingOpen(false);

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                        </Typography>

                        <Button color="inherit" onClick={handleBookingOpen}>Add Person</Button>

                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/showPerson'> <Button color="inherit" >Show All Person</Button></Link>

                    </Toolbar>
                </AppBar>
            </Box>


            <AddPerson openBooking={openBooking}
                handleBookingClose={handleBookingClose}></AddPerson>
        </div>
    );
}
