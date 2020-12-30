import React, { createContext, useContext, useReducer } from "react";

export const RoomsContext = createContext();

export const RoomsProvider = ({ reducer, initialState, children }) => (
  <RoomsContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </RoomsContext.Provider>
);

export const useRoomsState = () => useContext(RoomsContext);
