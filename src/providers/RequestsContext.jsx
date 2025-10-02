import axios from 'axios'
import { createContext, useState, useContext } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useError } from './ErrorContext'
import { useAuth } from './AuthContext';

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
  const errorModel = useError();
  const auth = useAuth();

  async function showError(props) {
    if (errorModel) await errorModel.push(props);
  }

  const incrementRequests = () => setActiveRequests(prev => prev + 1);
  const decrementRequests = () => setActiveRequests(prev => Math.max(0, prev - 1));

  const createClient = () => {
    const clientData = axios.create({ //we can then perform crud operations with dirrerent methods repositories
      baseURL: 'http://localhost:4000',
      timeout: 5000,
    });

    const token = auth?.user?.token ?? auth?.token ?? null;
    if (token) {
      clientData.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return clientData;
  };

  const api = async (path) => {
    incrementRequests();
    const clientData = createClient();
    try {
      const response = await clientData.get(path);
      return response;
    } catch (error) {
      await showError({
        message: error,
        height: error?.response?.status === 404 || error?.response?.status === 500 ? 400 : ''
      });
      throw error;
    } finally {
      decrementRequests();
    }
  };

  async function withLoading(fn) {
    incrementRequests();
    try {
      const res = await fn();
      return res;
    } catch (err) {
      throw err;
    } finally {
      decrementRequests();
    }
  }

  const values = {
    loadingCount: activeRequests,
    isLoading: activeRequests > 0,
    api,
    withLoading,
    showError
  };

  return (
    <RequestsContext.Provider value={values}>
      {children}
      { Boolean(activeRequests) && <LoadingOverlay /> }
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  return useContext(RequestsContext);
}
