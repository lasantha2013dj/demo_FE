import {Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useState} from "react";

function FetchAllStudents() {

    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState('');

    const handleFetch = async () => {

        try {
            setError('');
            const response = await fetch(`http://localhost:8080/api/home/getStudents`);
            if (!response.ok) {
                throw new Error('Students not found');
            }
            const result = await response.json();
            setStudentData(result);
        } catch (err) {
            setStudentData(null);
            setError(err.message);
        }
    };

    return (
        <div> {/* 🔧 Changed from <dev> to valid <div> */}

            <Button variant="contained" onClick={handleFetch}>
                Get All Students
            </Button>

            {error && (
                <Box sx={{mt: 2, color: 'red'}}>
                    {error}
                </Box>
            )}

            <Box sx={{mt: 3}}>
                {studentData && (
                    <Paper sx={{mt: 4}}>
                        <div style={{maxHeight: '700px', overflowY: 'auto', display: 'block'}}>

                            <Table sx={{backgroundColor: '#eeeeee'}}>

                                <TableHead sx={{backgroundColor: '#cee8fd'}}>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        studentData.map((student) => (
                                            <TableRow key={student.studentID}>
                                                <TableCell>{student.studentID}</TableCell>
                                                <TableCell>{student.firstName}</TableCell>
                                                <TableCell>{student.lastName}</TableCell>
                                            </TableRow>
                                        ))
                                    }

                                </TableBody>
                            </Table>
                        </div>
                    </Paper>
                )}
            </Box>
        </div>
    );
}

export default FetchAllStudents;