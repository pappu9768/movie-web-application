import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
const Register = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Register Data:", formData);

        try {
            const url = "http://localhost:8080/api/v1/auth/register"
            const options = {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(formData)
            }

            const res = await fetch(url,options);
            const result = await res.json();
            console.log(result); 

            const {success,error,message} = result;
            if(success){
                toast.success(message);
                navigate('/login');
            }else if(error){
                toast.error(error?.details[0].message);
            } else if(!success){
                toast.error(message);
            }


            
        } catch (error) {
            console.log(error)
        }
    };



    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#020900"
        >
            <Paper elevation={3} sx={{ p: 4, width: 360 }}>
                <Typography variant="h5" textAlign="center" mb={3}>
                    Register
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Full Name"
                        name="name"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Username"
                        type="username"
                        name="username"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        required
                    />



                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Register
                    </Button>
                </form>

                <Typography variant="body2" textAlign="center" mt={2}>
                    <Link to='/login' style={{ textDecoration: 'none' }}>Already have an account? Login</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Register;
