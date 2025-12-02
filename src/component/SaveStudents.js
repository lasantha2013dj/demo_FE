import {useState} from "react";
import Box from "@mui/material/Box";
import {Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";

function SaveStudents() {

    const [error, setError] = useState('');


    const [student, setStudent] = useState({
        studentID: '',
        firstName: '',
        lastName: ''
    })

    const [saveResponse, setSaveResponse] = useState({
        studentID: '',
        firstName: '',
        lastName: ''
    })

    const saveStudent = () => {

        if (!student || !student.firstName || !student.lastName) {
            setError("Please fill in all required fields.");
            return; // Stop function execution
        }

        setError("");
        fetch("http://localhost:8080/home/saveStudent",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(student)
            }).then((response) => response.json())
            .then((data) => {
                // console.log(data);
                alert('Student saved successfully!');
                setStudentAfterSave(data);
            })
            .catch((error) => {
                console.error('Error saving student:', error);
                alert('Failed to save student.');
            });
    };

    const setStudentAfterSave = (callBackStudent) => {
        setSaveResponse(callBackStudent);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        saveStudent();
    };


    return (
        <>
            <Box sx={{p: 4, maxWidth: 500}}>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={student.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={student.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" sx={{mt: 2}}>
                        Submit
                    </Button>

                    {error && (
                        <Typography color="error" sx={{mt: 2}}>
                            {error}
                        </Typography>
                    )}
                </form>

                <Box sx={{mt: 4}}>
                    {/*<Typography variant="h6">Student Object:</Typography>*/}
                    {/*<pre>{JSON.stringify(saveResponse, null, 2)}</pre>*/}


                    {saveResponse && saveResponse.studentID && (
                        <Paper sx={{mt: 4}}>
                            <Table sx={{backgroundColor: '#eeeeee'}}>
                                <TableHead sx={{backgroundColor: '#cee8fd'}}>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{saveResponse.studentID}</TableCell>
                                        <TableCell>{saveResponse.firstName}</TableCell>
                                        <TableCell>{saveResponse.lastName}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    )}
                </Box>
            </Box>


        </>
    );


}

export default SaveStudents;