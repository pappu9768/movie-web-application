import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const AddMovie = () => {

    const [addData, setAddData] = React.useState({
        movieName: '',
        director: '',
        release: '',
        cast: '',
        rating: ''
    })

    const HandleForm = async (e) => {
        e.preventDefault()
        console.log(addData)

        try {
            const token = localStorage.getItem('Tokens')
            const url = 'http://localhost:8080/api/v1/auth/admin'
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization':`${token}`
                },
                body: JSON.stringify(addData)
            })

            const result = await res.json();
            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                minHeight='100vh'
                bgcolor='red'

            >
                <Paper elevation={3} sx={{ p: 4, width: 360 }}>
                    <Typography variant='h5' textAlign='center' mb={4} fontWeight={600}>
                        Add more movies
                    </Typography>


                    <form onSubmit={HandleForm}>
                        <TextField
                            label="Movie Name"
                            name="name"
                            fullWidth
                            margin="normal"
                            required
                            value={addData.movieName}
                            onChange={(e) => setAddData({ ...addData, movieName: e.target.value })}

                        />


                        <TextField
                            label="Directed by"
                            name='name'
                            fullWidth
                            margin='normal'
                            required
                            value={addData.director}
                            onChange={(e) => setAddData({ ...addData, director: e.target.value })}
                        />

                        <TextField
                            label="Release on"
                            name='name'
                            fullWidth
                            margin='normal'
                            required
                            value={addData.release}
                            onChange={(e) => setAddData({ ...addData, release: e.target.value })}
                        />

                        <TextField
                            label="Cast"
                            name='name'
                            fullWidth
                            margin='normal'
                            required
                            value={addData.cast}
                            onChange={(e) => setAddData({ ...addData, cast: e.target.value })}
                        />

                        <TextField
                            label='Rating'
                            name='name'
                            fullWidth
                            margin='normal'
                            required
                            value={addData.rating}
                            onChange={(e) => setAddData({ ...addData, rating: e.target.value })}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mt: 2 }}

                        >Add</Button>

                    </form>

                   
                </Paper>

            </Box>
        </>
    )
}

export default AddMovie
