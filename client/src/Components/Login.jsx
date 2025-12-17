import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
const Login = () => {

    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(login);

        try {
            const url = "http://localhost:8080/api/v1/auth/login"
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(login)

            })

            const result = await res.json()
            // console.log(result);

            const { success, createToken, error, message } = result;

            if (success) {
                toast.success(message)
                localStorage.setItem('Tokens',createToken);
                navigate('/main')
            } else if (error) {
                toast.error(error.details[0]?.message)

            } else if (!success) {
                toast.error(message)

            }
        } catch (error) {
            console.log(error)

        }


    }
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
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={login.email}
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                        required
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={login.password}
                        onChange={(e) => setLogin({ ...login, password: e.target.value })}
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>

                <Typography variant="body2" textAlign="center" mt={2}>
                    <Link to='/register' style={{ textDecoration: 'none' }}>Don`t have an account? Register</Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
