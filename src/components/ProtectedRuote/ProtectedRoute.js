import { useAuth } from "../../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) return <h1>Cargando...</h1>;
    if (!user) return <Navigate to="/login" />;

    // Outlet representa a los "hijos" de esta ruta
    return <Outlet />;
}