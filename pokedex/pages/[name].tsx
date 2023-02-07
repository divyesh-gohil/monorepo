import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import { RowData } from ".";
import { wrapper } from "../app/store";
import { fetchPockenDetail, selectPokemonDetail } from "../app/store/slices/pokemonDetail";
import { useSelector } from "react-redux";

export type PokemonData = {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: [
    {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[]
  ];
};

const Pokemon = () => {
  const data = useSelector(selectPokemonDetail);
  return (
    <div>
      <h1>{data?.name || ''}</h1>
      <p>Pokemon Wight: {data?.weight || ''}</p>
      <p>Pokemon Height: {data?.height || ''}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const paths = res.data.results.map((pokemon: RowData) => ({
    params: { name: pokemon.name },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  await store.dispatch(fetchPockenDetail(ctx?.params?.name as string));
  return{
    props: {}
  }
})

export default Pokemon;
