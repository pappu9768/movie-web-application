import React, { useEffect } from 'react'
import { Box, TextField, Paper, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'


const Edit = () => {
  const navigate = useNavigate();
  const [editData, setEditData] = React.useState({
    movieName: '',
    director: '',
    release: '',
    cast: '',
    rating: ''
  })


  const { id } = useParams();
  useEffect(() => {
    const fetchSpecificMovies = async () => {
      try {
        const token = localStorage.getItem('Tokens')
        const url = `http://localhost:8080/api/v1/auth/movies/${id}`
        const res = await fetch(url, {
          headers: {
            'authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        })
        const result = await res.json();
        // console.log(result);
        setEditData({
          movieName: result.get?.title,
          director: result.get?.director,
          release: result.get?.year,
          cast: result.get?.cast,
          rating: result.get?.rating
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchSpecificMovies();
  }, [id])


  const handleEdit = async (e) => {
    e.preventDefault();
    // console.log(editData)

    try {
      const token = localStorage.getItem('Tokens')
      const url = `http://localhost:8080/api/v1/auth/admin/${id}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'authorization': `${token}`,
          'Content-Type': 'application/json'

        },
        body: JSON.stringify({
          title: editData.movieName,
          year: editData.release,
          director: editData.director,
          cast: editData.cast,
          rating: editData.rating
        })

      })
      const resultant = await res.json();
      // console.log(resultant);
      navigate('/main')
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
            Edit Movie
          </Typography>


          <form onSubmit={handleEdit}>
            <TextField
              label="Movie Name"
              name="name"
              fullWidth
              margin="normal"
              required
              value={editData.movieName}
              onChange={(e) => setEditData({ ...editData, movieName: e.target.value })}

            />


            <TextField
              label="Directed by"
              name='name'
              fullWidth
              margin='normal'
              required
              value={editData.director}
              onChange={(e) => setEditData({ ...editData, director: e.target.value })}

            />

            <TextField
              label="Release on"
              name='name'
              fullWidth
              margin='normal'
              required
              value={editData.release}
              onChange={(e) => setEditData({ ...editData, release: e.target.value })}

            />

            <TextField
              label="Cast"
              name='name'
              fullWidth
              margin='normal'
              required
              value={editData.cast}
              onChange={(e) => setEditData({ ...editData, cast: e.target.value })}

            />

            <TextField
              label='Rating'
              name='name'
              fullWidth
              margin='normal'
              required
              value={editData.rating}
              onChange={(e) => setEditData({ ...editData, rating: e.target.value })}

            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2 }}

            >Edit</Button>

          </form>

          <Typography variant='body2' textAlign="center" mt={2}>
            <Link to='/add' style={{ textDecoration: 'none', fontSize: '18px' }}>Add new movie</Link>
          </Typography>
        </Paper>


      </Box>
    </>
  )
}

export default Edit
