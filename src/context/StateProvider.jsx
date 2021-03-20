import React, { createContext, useReducer } from "react";

export const StateContext = createContext();

// https://api.themoviedb.org/3/discover/movie?api_key=d2fa7ad1e26af0847d349d7dbd5f93e5&language=en-US&with_genres=${id}&page=1

const initialState = {
  movies: [],
  trending: undefined,
  details: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "SET_TRENDING":
      return { ...state, trending: action.payload };
    case "SET_DETAILS":
      return { ...state, details: action.payload };
    default:
      return state;
  }
};

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
