import { createSlice } from "@reduxjs/toolkit";
import { AppState, AppThunk } from "../index";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";

import { PokemonData } from "../../../pages/[name]"

const initialState:{data: PokemonData | null} = {data: null};

// Actual Slice
export const pokemonDetailSlice = createSlice({
  name: "pokemonDetail",
  initialState,
  reducers: {
    setPokemonDetail(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(HYDRATE, (state, action: any) =>{
      return {
        ...state,
        ...action.payload.pokemonDetail,
      };
    })
  }
});

export const { setPokemonDetail } = pokemonDetailSlice.actions;
export default pokemonDetailSlice.reducer;

//selectors
export const selectPokemonDetail = (state: AppState) => state.pokemonDetail.data;

// Thunk
export const fetchPockenDetail = (name: string): AppThunk => async (dispatch) => {
    try{
        const { data, status } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if(status === 200) return dispatch(setPokemonDetail(data));
        dispatch(setPokemonDetail(null));
    }catch{
        dispatch(setPokemonDetail(null));
    }
}

