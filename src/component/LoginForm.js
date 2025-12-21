import React from "react";
import {TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function LoginForm({
                       student,
                       setStudent,
                       error,
                       setError,
                       color,
                       setColor,
                       openSignUp,
                       onSignUp,
                       onSuccessLogin,
                       onSuccessSignUp,
                       isOpen,
                       onClose
                   }) {
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

        if (openSignUp) {
            if (!student || !student.firstName || !student.lastName || !student.password) {
                setError("Please fill in all required fields!");
                return;
            }
        } else {
            if (!student || !student.firstName || !student.password) {
                setError("Please fill in all required fields!");
                return;
            }
        }
        setError("");

        try {
            if (openSignUp) {
                fetch("http://localhost:8080/api/auth/signUp", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(student),
                })
                    .then(async (response) => {
                        const data = await response.json();

                        if (!response.ok) {
                            throw new Error(data.message || "SignUp failed");
                        }
                        alert("Student Sign Up Successfully!");
                        return data;
                    })
                    .then((data) => {
                        console.log("Response:", data);
                        onSuccessSignUp();
                    })
                    .catch((error) => {
                        console.error("Error Sign Up student:", error.message);
                        alert(error.message);
                    });
            } else {
                fetch("http://localhost:8080/api/auth/signIn", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(student)
                })
                    .then(async (response) => {
                        const data = await response.json();
                        if (!response.ok) {
                            throw new Error(data.message || "SignIn failed");
                        }
                        alert("Student SignIn successfully!");
                        return data;
                    })
                    .then((data) => {
                        // console.log("Response body:", data);
                        onSuccessLogin(data);
                        localStorage.setItem("token", data.data);
                    })
                    .catch((error) => {
                        console.error("Error SignIn student:", error.message);
                        alert(error.message);
                    });
            }

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

                {
                    openSignUp &&
                    <h2>Sign Up Form</h2>
                }
                {
                    !openSignUp &&
                    <h2>Login Form</h2>
                }

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

                        {
                            openSignUp &&
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={student.lastName}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        }

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

                        {
                            !openSignUp &&
                            <p
                                tabIndex={0}
                                onFocus={() => setColor("blue")}
                                onBlur={() => setColor("blue")}
                                style={{color}}
                                onClick={onSignUp}
                            >
                                Sign Up Here!
                            </p>
                        }

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
