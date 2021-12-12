import React, { useState, useRef } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddPerson = ({ openBooking, handleBookingClose, setBookingSuccess }) => {
    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const hobbiesRef = useRef();



    const handleAddPerson = e => {
        const name = nameRef.current.value;
        const phone = phoneRef.current.value;
        const email = emailRef.current.value;
        const hobbies = hobbiesRef.current.value;
        const newPerson = { name, phone, email, hobbies, }


        fetch('https://intense-falls-80420.herokuapp.com/persons', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newPerson)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully added Products.')
                    e.target.reset();
                    handleBookingClose();
                    window.location.reload(false)
                }
            })
        e.preventDefault();
    }






    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openBooking}
            onClose={handleBookingClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openBooking}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">

                    </Typography>
                    <form onSubmit={handleAddPerson}>
                        <h2 className="Products-heading">Add a Person</h2>
                        <TextField
                            sx={{ width: '90%', m: 1, input: { color: 'green' } }}
                            id="outlined-size-small"
                            inputRef={nameRef}
                            label="Name"
                            variant="standard"
                            className='input-field'
                            InputLabelProps={{
                                style: { color: 'blue', paddingLeft: '10px' }
                            }}
                            required
                        />
                        <TextField
                            sx={{ width: '90%', m: 1, input: { color: 'green' } }}
                            id="outlined-size-small"
                            inputRef={phoneRef}
                            label="Phone"
                            variant="standard"
                            className='input-field'
                            InputLabelProps={{
                                style: { color: 'blue', paddingLeft: '10px' }
                            }}
                            required
                        />
                        <TextField
                            sx={{ width: '90%', m: 1, input: { color: 'green' } }}
                            id="outlined-size-small"
                            inputRef={emailRef}
                            label="Email"
                            type="email"
                            variant="standard"
                            className='input-field'
                            InputLabelProps={{
                                style: { color: 'blue', paddingLeft: '10px' }
                            }}
                            required
                        />
                        <TextField
                            sx={{ width: '90%', m: 1, input: { color: 'green' } }}
                            id="outlined-size-small"
                            inputRef={hobbiesRef}
                            label="Hobbies"
                            variant="standard"
                            className='input-field'
                            InputLabelProps={{
                                style: { color: 'blue', paddingLeft: '10px' }
                            }}
                            required
                        />




                        <Button sx={{ width: '90%', m: 1 }} type="submit" variant="contained">Save</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AddPerson;