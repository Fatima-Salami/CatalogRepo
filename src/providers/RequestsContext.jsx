import axios from 'axios'
import  { createContext, useState, useContext } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useError } from './ErrorContext'

// Simple overlay
function LoadingOverlay() {
 return (
    <Box
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <CircularProgress color='inherit' />
    </Box>
  )
}

const RequestsContext = createContext();

export function RequestsProvider({ children }) {
  const [activeRequests, setActiveRequests] = useState(0);
  const errorModel = useError()

  async function showError(props) {
    if (errorModel) await errorModel.push(props)
  }

  const incrementRequests = () => {
    setActiveRequests(prev => prev + 1)
  }

  const decrementRequests = () => {
    setActiveRequests(prev => prev - 1)
  }

  const api = async(path) => {
    incrementRequests()
   const req =  axios.create({
  baseURL: 'http://localhost:4000', //can then be generalized to CRUD operations and other endpoints
  timeout: 5000
   })
    try {
        const response = await req.get(path);
        return response;
      } catch (error) {
        showError({
          message: error,
          height: error?.response?.status === 404 || error?.response?.status === 500 ? 400 : ''
        });
        throw error;
      } finally {
        decrementRequests();
      }
    }



  const values = {
    loadingCount: activeRequests,
    isLoading: activeRequests > 0,
    api
  };

  return (
    <RequestsContext.Provider value={values}>
      {children}
      { Boolean(activeRequests) && <LoadingOverlay />}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  return useContext(RequestsContext);
}
