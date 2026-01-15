import MainLayout from "./pages/MainLayout";
import PrivateRoute from "./routes/PrivateRoutes";

const App = () => {
  return (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  );
};

export default App;
