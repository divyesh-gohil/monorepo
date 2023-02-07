import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { fetchPockenList, selectPokemonListData, setPokemonList } from "../app/store/slices/pokemon";
import { wrapper } from "../app/store";

//Types
export type RowData = { name: string; url: string };

const columns: GridColDef[] = [{
  field:  'name', headerName: 'Name', colSpan: 12
}];

export default function Home() {
  const router = useRouter();
  const pokemonList = useSelector(selectPokemonListData);
  const handleRowClick = ({ row }: { row: RowData } ) => {
    router.push(`/${row.name}`);
  }
  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <DataGrid
        rows={pokemonList}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        experimentalFeatures={{ newEditingApi: true }}
        onRowClick={handleRowClick}
        getRowId={() => Math.random()}
      />
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(fetchPockenList()); 
      return {
        props: {},
      };
    }
);