import LayoutSecundario from "../../layout/LayoutSecundario/LayoutSecundario";
import FilterByGenres from "../../components/Filter/FilterByGenres";

const Generos = () => {
  return (
    <LayoutSecundario textoBoton={"generos"}>
      <FilterByGenres />
    </LayoutSecundario>
  );
};

export default Generos;
