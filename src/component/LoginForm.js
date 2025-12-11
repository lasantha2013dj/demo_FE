import React from "react";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function LoginForm({student, setStudent, error, setError, isOpen, onClose}) {
    if (!isOpen) return null;

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
        // login();

        if (!student || !student.firstName || !student.lastName) {
            setError("Please fill in all required fields.");
            return;
        }
        setError("");

        try {

            // fetch("http://localhost:8080/api/auth/signIn",
            //     {
            //         method: "POST",
            //         headers: {"Content-Type": "application/json"},
            //         body: JSON.stringify(student)
            //     }).then((response) => response.json())
            //     .then((data) => {
            //         console.log(data);
            //         alert('Student saved successfully!');
            //         // setStudentAfterSave(data);
            //     })
            //     .catch((error) => {
            //         console.error('Error saving student:', error);
            //         alert('Failed to save student.');
            //     });

            fetch("http://localhost:8080/api/auth/signIn", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student),
            })
                .then((response) => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response.json();
                })
                .then((data) => {
                    console.log("Response:", data);
                    alert("Student saved successfully!");
                    // setStudentAfterSave(data);
                })
                .catch((error) => {
                    console.error("Error saving student:", error);
                    alert("Failed to save student.");
                });

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={overlayStyle}>
            <div style={popupStyle}>


                <div>
                    <p align="right">
                        <span onClick={onClose} style={{fontSize: "24px", cursor: "pointer"}}>✕</span>
                    </p>
                </div>


                <h2>Login Form</h2>

                <Box sx={{p: 4, maxWidth: 500}}>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="User Name"
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
                        <TextField
                            label="Password"
                            name="password"
                            value={student.password}
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
                </Box>
            </div>
        </div>
    );
}

const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
};

const popupStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    minWidth: "600px",
};

export default LoginForm;
