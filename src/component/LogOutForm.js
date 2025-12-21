import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";

function LogOutForm({
                        openLogOut,
                        onLogOut,
                        onClose
                    }) {

    if (!openLogOut) return null;

    const handleSubmit = () => {
        onLogOut();
    }

    return (
        <div style={overlayStyle}>
            <div style={popupStyle}>

                <div>
                    <p align="right">
                        <span onClick={onClose} style={{fontSize: "24px", cursor: "pointer"}}>✕</span>
                    </p>
                </div>

                <h2>Are you sure you want to log out?</h2>

                <Box sx={{p: 4, maxWidth: 500}}>

                    <form onSubmit={handleSubmit}>
                        <Button type="submit" variant="contained" sx={{mt: 2}}>
                            Log Out Now!
                        </Button>

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

export default LogOutForm;
