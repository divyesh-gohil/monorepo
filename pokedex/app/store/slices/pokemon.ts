import { createSlice } from "@reduxjs/toolkit";
import { AppState, AppThunk } from "../index";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";

const initialState = {data: []};

// Actual Slice
export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonList(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action?.payload?.pokemon,
      };
    })
  },
});

export const { setPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;

//selectors
export const selectPokemonListData = (state: AppState) => state.pokemon.data;

// Thunk
export const fetchPockenList = (): AppThunk => async (dispatch) => {
    try{
        const { data, status } = await axios.get('https://pokeapi.co/api/v2/pokemon');
        if(status === 200) return dispatch(setPokemonList(data.results));
        dispatch(setPokemonList([{name: "Error", ulr: "404 Not Found"}]));
    }catch{
        dispatch(setPokemonList([{name: "Error", ulr: "404 Not Found"}]));
    }
}

