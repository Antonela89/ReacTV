import LayoutMain from '../../layout/LayoutMain/LayoutMain'
import {HomeDeskoptComponents} from './HomeDeskopt/HomeDeskopt';
import HomeMobile  from './HomeMobile/HomeMobile';
import { useAuth } from '../../context/authContext';  // Importa el hook useAuth

const Home = ({anchoVentana}) => {
  const { isAuth } = useAuth();  // Obtiene el estado de autenticación del contexto

  const renderDeskoptContent = () => {
    if (anchoVentana > 768) {
      return isAuth ? <HomeDeskoptComponents.MainDeskoptLogueado /> : <HomeDeskoptComponents.MainDeskoptInvitado />;
    }
    return isAuth ? <HomeMobile.MainMobileLogueado /> : <HomeMobile.MainMobileInvitado />;
  };

  return (
    <LayoutMain>
      {renderDeskoptContent()}
    </LayoutMain>    
  )
}

export default Home

