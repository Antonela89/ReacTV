import LayoutSecundario from "../../layout/LayoutSecundario/LayoutSecundario";
import MediaSelector from "../../components/MediaSelector/MediaSelector";
import ListByCategories from "../../components/Lists/ListByCategories";

const Categorias = () => {
  return (
    <LayoutSecundario textoBoton={"categorias"}>
      <MediaSelector />
      <ListByCategories />
    </LayoutSecundario>
  );
};

export default Categorias;
