import React, { use, useEffect, useState, useContext } from 'react'
import Navbar from './Navbar';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Button,
  TextField,
  InputAdornment,
  Paper
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import ApiContext from '../ContextApi/ApiContext';
import Pagination from '@mui/material/Pagination';
import { useNavigate, Link } from 'react-router-dom';


const Main = () => {
  const { pageData, setPageData, fetchMoviesInPage, role, getRole } = useContext(ApiContext);

  const [search, setSearch] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);


  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");

  const navigate = useNavigate();



  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      setPage(1); // reset to page 1 on new search
      fetchMoviesInPage(1, search,sortBy,order);
    }, 500); // 500ms debounce

    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [search]);




  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;


    try {
      const token = localStorage.getItem('Tokens');
      const url = `http://localhost:8080/api/v1/auth/admin/${id}`
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'authorization': `${token}`
        }
      })
      // console.log(res.json())
      setPageData(pageData.movies.filter((mov) => mov._id !== id))

      setLoading(true);
      await fetchMoviesInPage(page);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRole()


  }, [role])


  useEffect(() => {
    fetchMoviesInPage(page, search, sortBy, order);   // fetch movies whenever page changes
    // console.log(pageData)
  }, [page,sortBy,order]);


  const handlePageChange = (event, value) => {
    setLoading(true);
    setPage(value);
  };

  useEffect(() => {
    if (!pageData) return;  // no data yet

    // When API sends error  
    if (pageData.err) {
      setError(true);
      setLoading(false);
    }
    // When API success but empty list
    else if (pageData.success && pageData.movies?.length === 0) {
      setError(false);
      setLoading(false);
    }
    // When API success & movies present
    else {
      setError(false);
      setLoading(false);
    }
  }, [pageData]);





  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        mt={12}

      >
        <Paper
          elevation={3}
          sx={{
            p: 1,
            borderRadius: 3,
            width: { xs: "90%", sm: 400 },
          }}
        >
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            placeholder="Search movies by title, cast, director..."
            size="small"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& fieldset": { border: "none" },
            }}
          />
        </Paper>
      </Box>

      <Box display="flex"
        gap={2} mt={4} mb={3} justifyContent='center'>
        <TextField
          select
          label="Sort By"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          SelectProps={{ native: true }}
          size="small"
        >
          <option value="title">Name</option>
          <option value="rating">Rating</option>
          <option value="year">Release Year</option>
          
        </TextField>

        <Button
          variant="outlined"
          onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
        >
          {order === "asc" ? "ASC ⬆️" : "DESC ⬇️"}
        </Button>
      </Box>


      <Container maxWidth="md" sx={{ mt: 12 }}>

        {/* show CircularProgress when movies are loading  */}
        {
          loading && (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              mt={4}
              flexDirection="column"
              gap={2}

            >
              <CircularProgress />
              <Typography variant='h6' color='text.secondary'>
                Movies are loading
              </Typography>

            </Box>
          )
        }

        {/* show error when fetch fails */}
        {
          !loading && error && (
            <Typography variant='h6' color='error' textAlign='center' mt={3}>
              Failed to fetch movies (Please check your internet connection )
            </Typography>
          )
        }

        {/* Show 'No movies found' when data is empty but there's no error */}
        {
          !loading && !error && pageData.movies?.length === 0 && (
            <Typography variant='h6' color='text.secondary' textAlign="center" mt={3}>
              No movies Found(Due to server error)
            </Typography>
          )
        }

        {/* show movies when there is no error */}

        {
          !loading && !error && pageData.movies?.length > 0 && (
            <Box display='flex' flexDirection='column' gap={3}>
              {
                pageData.movies.map((val) => (
                  <Card key={val._id} sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>
                    <CardContent>
                      <Typography variant='subtitle1' color='text.secondary'>
                        Rank: {val.rank}
                      </Typography>

                      <Typography variant='h5' fontWeight={600}>
                        {val.title}

                      </Typography>

                      <Typography variant='body1' >
                        Leading Cast: <strong>{val.cast}</strong>
                      </Typography>

                      <Typography variant='body1' mt={1}>
                        Release Year:<strong>{val.year}</strong>
                      </Typography>

                      <Typography variant='body1' >
                        Directed By:<strong>{val.director}</strong>
                      </Typography>

                      <Typography variant='body1' >
                        Rating :<strong>{val.rating}</strong>
                      </Typography>

                      {
                        role == 0 && (
                          <>
                            <Button
                              component={Link}
                              to={`/edit/${val._id}`}
                              variant="outlined">Edit Movie</Button>
                            <Button onClick={() => handleDelete(val._id)}>Delete Movie</Button>
                          </>
                        )
                      }
                    </CardContent>

                  </Card>
                ))
              }

            </Box>
          )
        }

      </Container >

      {/* Pagination Component */}
      < Box display="flex" justifyContent="center" mt={4} >
        <Pagination
          count={pageData.totalPages}   // backend returns this
          page={page}

          onChange={handlePageChange}
          color="primary"
          size="large"
          shape="rounded"
        />
      </Box >
    </>
  )
}

export default Main
