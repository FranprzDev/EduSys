import NavError from "../components/Navbars/NavError";
import LoginPage from "../components/LoginPage";

const Login = () => {
  return (

    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column" }}>
      <NavError/>
      <section className="mt-5">
        <LoginPage/>
      </section>
    </div>
  );
};


export default Login;
