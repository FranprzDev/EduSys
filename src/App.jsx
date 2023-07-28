/* -> Importaciones */
import Footer from "./components/Footer";
import AppRouter from "./routers/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { JwtProvider } from "./context/JwtContext";

function App() {

  return (
    <JwtProvider>
      <BrowserRouter>
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </JwtProvider>
  );
}

export default App;
