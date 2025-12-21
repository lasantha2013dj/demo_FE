import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

function FetchStudents() {

    const [studentId, setStudentId] = useState('');
    const [studentFname, setStudentFname] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setStudentData({
            studentID: '',
            firstName: '',
            lastName: '',
        });
        setStudentId('');
        setStudentFname('');
    }, [])

    const handleFetch = async () => {
        if (!studentId) {
            setError('Please fill at leat one field!');
            return;
        }

        try {
            setError('');
            const token = localStorage.getItem("token");
            console.log(token);

            const response = await fetch(
                `http://localhost:8080/api/home/getStudentById/${studentId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Student not found');
            }
            const result = await response.json();
            setStudentData(result);
        } catch (err) {
            setStudentData(null);
            setError(err.message);
        }
    };


    return (
        <div>
            <Box sx={{p: 4, maxWidth: 500}}>
                <TextField
                    label="Student ID"
                    variant="outlined"
                    fullWidth
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    sx={{mb: 2}}
                />

                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={studentFname}
                    onChange={(e) => setStudentFname(e.target.value)}
                    sx={{mb: 2}}
                />

                <Button variant="contained" onClick={handleFetch}>
                    Get Student Info
                </Button>

                {error && (
                    <Typography color="error" sx={{mt: 2}}>
                        {error}
                    </Typography>
                )}

                {studentData && !error && (
                    <Box sx={{mt: 3}}>
                        {/*<Typography variant="h6">Student Data:</Typography>*/}
                        {/*<pre>{JSON.stringify(studentData, null, 2)}</pre>*/}

                        {studentData && studentData.studentID && (
                            <Paper sx={{mt: 4}}>
                                <Table sx={{backgroundColor: '#cee8fd'}}>
                                    <TableHead sx={{backgroundColor: '#eeeeee'}}>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>First Name</TableCell>
                                            <TableCell>Last Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{studentData.studentID}</TableCell>
                                            <TableCell>{studentData.firstName}</TableCell>
                                            <TableCell>{studentData.lastName}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        )}
                    </Box>
                )}
            </Box>
        </div>
    );


}

export default FetchStudents;