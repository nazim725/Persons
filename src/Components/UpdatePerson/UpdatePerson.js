import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const UpdatePerson = () => {

    const { personId } = useParams();
    console.log(personId)
    const [person, setPerson] = useState({});

    const url = `https://intense-falls-80420.herokuapp.com/persons/${personId}`
    console.log(url)
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPerson(data)
                console.log(data)
            })
    }, [])


    const handleUpdateProduct = e => {
        const url = `https://intense-falls-80420.herokuapp.com/persons/${personId}`;
        console.log(url)
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(person)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('Update Successful');
                    setPerson({});
                    window.location.reload(false)

                }
            })
        e.preventDefault();
    }


    const handleNameChange = e => {
        const updatedName = e.target.value;
        const updatedPerson = { name: updatedName, phone: person.phone, email: person.email, hobbies: person.hobbies };
        setPerson(updatedPerson)
    }
    const handlePhoneChange = e => {
        const updatePhone = e.target.value;
        const updatedPerson = { name: person.name, phone: updatePhone, email: person.email, hobbies: person.hobbies };
        setPerson(updatedPerson)
    }

    const handleEmailChange = e => {
        const updateEmail = e.target.value;
        const updatedPerson = { name: person.name, phone: person.phone, email:updateEmail, hobbies: person.hobbies };
        setPerson(updatedPerson)
    }
    const handleHobbiesChange = e => {
        const updateHobbies = e.target.value;
        const updatedPerson = { name: person.name, phone: person.phone, email:person.email, hobbies: updateHobbies };
        setPerson(updatedPerson)
    }

    return (
       
            <Box>
                <Typography style={{marginTop:'20px',paddingBottom:'15px'}} id="transition-modal-title" variant="h4" component="h2">
                    Update Person
                </Typography>

                <form onSubmit={handleUpdateProduct}>
                    <TextField
                        sx={{ width: '90%', m: 1, input: { color: 'blue' } }}
                        
                        id="outlined-password-input"
                        name="name"
                        onChange={handleNameChange}
                        value={person.name || ''}
                        required

                    />
                    <TextField
                        sx={{ width: '90%', m: 1, input: { color: 'blue' }}}
                        id="outlined-size-small"
                        name="phone"
                        onChange={handlePhoneChange}
                        value={person.phone || ''}
                        size="small"
                    />
                    <TextField
                        sx={{ width: '90%', m: 1,input: { color: 'blue' } }}
                        id="outlined-size-small"
                        name="email"
                        onChange={handleEmailChange}
                        value={person.email || ''}
                        size="small"
                    />
                    <TextField
                        sx={{ width: '90%', m: 1,input: { color: 'blue' } }}
                        id="outlined-size-small"
                        name="description"
                        onChange={handleHobbiesChange}
                        value={person.hobbies || ''}
                        size="small"
                        
                    />
                    <Button sx={{ width: '90%', m: 1 }} type="submit" variant="contained">Update</Button>
                </form>
            </Box>

       
    );
};

export default UpdatePerson;