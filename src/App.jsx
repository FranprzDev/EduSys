/* -> Importaciones */
import Footer from "./components/Footer";
import AppRouter from "./routers/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { JwtProvider } from "./context/JwtContext";
import { ErrorProvider } from "./context/ErrorContext";
import { InstProvider } from "./context/InstitucionContext";

function App() {

  return (
    <JwtProvider>
      <ErrorProvider>
        <InstProvider>
          <BrowserRouter>
            <AppRouter />
            <Footer />
          </BrowserRouter>
        </InstProvider>
      </ErrorProvider>
    </JwtProvider>
  );
}

export default App;
