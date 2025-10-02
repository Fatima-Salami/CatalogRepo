import './App.css'
import ProductsPage from './components/ProductsPage';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import RequireAuth from './components/RequireAuth';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
          <title>{`StockWise`}</title>
          <meta name='description' content={`StockWise`} />
          <meta name='keywords' content='Stock, Business, Wise' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <meta name='google' content='notranslate' />
        </Helmet>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <ProductsPage />
          </RequireAuth>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
