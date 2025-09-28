// src/providers/ErrorProvider.jsx
import {createContext, useState, useContext } from 'react';
import PageError from '../components/Shared/PageError'


/* Error context */
export const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [stack, setStack] = useState([]);

  function push(options) {
    setStack(s => [...s, { ...options }]);
  }

  function closeTop() {
    setStack(s => {
      const copy = [...s];
      copy.pop();
      return copy;
    });
  }

  const value = { push }

  return (
    <ErrorContext.Provider value={value}>
      {children}
      {stack.map((props, index) => (
        <PageError key={index} onClose={closeTop} {...props} />
      ))}
    </ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}
