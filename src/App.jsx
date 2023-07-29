/* -> Importaciones */
import Footer from "./components/Footer";
import AppRouter from "./routers/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { JwtProvider } from "./context/JwtContext";
import { ErrorProvider } from "./context/ErrorContext";

function App() {

  return (
    <JwtProvider>
      <ErrorProvider>
        <BrowserRouter>
          <AppRouter />
          <Footer />
        </BrowserRouter>
      </ErrorProvider>
    </JwtProvider>
  );
}

export default App;
