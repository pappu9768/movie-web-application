import React from 'react'
import ApiContext from './ApiContext.js'
import { useEffect } from 'react';
const ContextProvider = ({ children }) => {

  const [data, setData] = React.useState([]);
  const [pageData, setPageData] = React.useState([]);
  const [role, setRole] = React.useState('')
  // const handleMoviesApi = async () => {
  //   const url = 'http://localhost:8080/api/v1/auth/movies'
  //   try {
  //     const res = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'content-type': 'application/json'
  //       }
  //     })
  //     const result = await res.json();
  //     console.log(result);
  //     setData(result.getAll)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const fetchMoviesInPage = async (page = 1, search = "",sortBy = "title", order = "asc") => {
    try {
      const token = localStorage.getItem('Tokens')
      const res = await fetch(`http://localhost:8080/api/v1/auth/movies?page=${page}&limit=10&search=${search}&sortBy=${sortBy}&order=${order}`,{
        headers:{
          'Content-type':'application/json',
          'authorization':`${token}`
        }
      });
      const dataResult = await res.json();
      setPageData(dataResult);
    } catch (error) {
      setPageData({ err: true });
    }
  };

  const getRole = async () => {
    try {
      const getToken = localStorage.getItem('Tokens')
      const response = await fetch('http://localhost:8080/api/loggedIn', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `${getToken}`
        }
      })
      const result = await response.json();
      // console.log(result.user)

      const { success, user } = result;
      if (success) {
        setRole(user)
        localStorage.setItem('Role',result.user)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   handleMoviesApi();
  // }, [])

  // const sortMovie = async() => {
  //   try {
  //     const url = `http://localhost:8080/api/v1/movies?sortBy=rating&order=desc`
  //     const res = await fetch(url,{
  //       method:'GET',
  //       headers:{
  //         'Content-type':'application/json',
  //         // 'authorization':
  //       }
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <>
      <ApiContext.Provider value={{ data, setData, pageData, setPageData, fetchMoviesInPage, role, getRole }}>
        {children}
      </ApiContext.Provider>
    </>
  )
}

export default ContextProvider
