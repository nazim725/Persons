import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Table, Button } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink } from 'react-router-dom';
import AddPerson from '../AddPerson/AddPerson';

import emailjs from 'emailjs-com';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const ShowPerson = () => {
    const [check, setCheck] = React.useState([])
    const [openBooking, setBookingOpen] = React.useState(false);
    const handleBookingOpen = () => setBookingOpen(true);
    const handleBookingClose = () => setBookingOpen(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [sort, setSort] = React.useState('');
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // ---------------------------------

    const [persons, setPersons] = React.useState([])
    React.useEffect(() => {
        fetch('https://intense-falls-80420.herokuapp.com/persons')
            .then(res => res.json())
            .then(data => {
                setPersons(data)
            })
    }, [])



    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to delete?');
        if (proceed) {
            const url = `https://intense-falls-80420.herokuapp.com/persons/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remainingPersons = persons.filter(person => person._id !== id);
                        setPersons(remainingPersons);
                    }
                });
        }
    }

    function GetSelected() {
        //Reference the Table.
        var grid = document.getElementById("Table1");

        //Reference the CheckBoxes in Table.
        var checkBoxes = grid.getElementsByTagName("INPUT");
        var message = "Name\t        Phone\t         Email\n            ";

        //Loop through the CheckBoxes.
        for (var i = 0; i < checkBoxes.length; i++) {
            if (checkBoxes[i].checked) {
                var row = checkBoxes[i].parentNode.parentNode;
                // message += row.cells[1].innerHTML;
                message += "   " + row.cells[2].innerHTML;
                message += "   " + "    " + " " + row.cells[3].innerHTML;
                message += "   " + " " + row.cells[4].innerHTML;


            }
            message += "\n";
        }

        //Display selected Row data in Alert Box.

        document.getElementById("Message").innerText = message;
        document.getElementById("div").style.display = "block";

    }

    const sendEmail = (e) => {
        e.preventDefault();


        emailjs.sendForm('service_ximg5hc', 'template_in5i3ud', e.target, 'user_pZ0pRQFTOS1y1g7yZaHsf')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }
    const handleSort = (sortingValue) => {
        setSort(sortingValue)
        if (sort === 'desc') {
            // persons.sort();
            persons.reverse();
        }
        else {
            persons.sort((a, b) => a._id - b._id);
            persons.reverse();
        }
        console.log(persons);

    }




    return (


        <div>


            <TableContainer component={Paper}>
                <span>Sort</span>
                <select onChange={(e) => handleSort(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value='desc'>Descending</option>
                </select>

                <Table id='Table1' sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Select</StyledTableCell>
                            <StyledTableCell>Id</StyledTableCell>

                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Phone</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Hobbies</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>




                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {persons?.map((row, index) => (
                            <StyledTableRow key={row.name}>


                                <StyledTableCell align="center">
                                    <input type="checkbox" />

                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.name}</StyledTableCell>
                                <StyledTableCell align="center">{row.phone}</StyledTableCell>
                                <StyledTableCell align="center">{row.email}</StyledTableCell>
                                <StyledTableCell align="center">{row.hobbies}</StyledTableCell>


                                <StyledTableCell align="center"> <NavLink style={{ textDecoration: 'none' }} to={`/updatePerson/${row._id}`}><button style={{ backgroundColor: 'blue', padding: '10px', color: 'white', borderRadius: '5px' }}>Update</button></NavLink> <button style={{ backgroundColor: 'blue', padding: '10px', color: 'white', borderRadius: '5px' }} onClick={() => handleDelete(row._id)}>Delete</button></StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button style={{ marginTop: '20px' }} onClick={handleBookingOpen} variant="contained">Add Person</Button>
            <Button style={{ marginTop: '20px', marginLeft: '15px' }} onClick={GetSelected} variant="contained">Get Selected</Button>

            <div id='div' style={{ display: 'none', marginTop: '20px', paddingBottom: '30px' }}>
                <form onSubmit={sendEmail} style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <textarea name="" id="Message" cols="45" rows="15" class="box message" placeholder="Message" name="message" required ></textarea> <br />
                    <button type="submit" style={{ backgroundColor: 'blue', padding: '10px', color: 'white', borderRadius: '5px', width: '50%' }}>Send Email </button>
                </form>

            </div>


            <AddPerson openBooking={openBooking}
                handleBookingClose={handleBookingClose}>
            </AddPerson>



        </div>



    );
};

export default ShowPerson;