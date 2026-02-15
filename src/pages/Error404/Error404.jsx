import NotFound from '../../components/Error404/NotFound';
import LayoutMain from '../../layout/LayoutMain/LayoutMain'

function Error404() {
    return (
        <LayoutMain>
            <NotFound/>
        </LayoutMain>
    );
}

export default Error404;
