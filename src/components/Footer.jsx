import 'bootstrap/dist/css/bootstrap.css'
import { UilFacebook, UilInstagram, UilTwitter } from '@iconscout/react-unicons'
import NotFoundScreen from '../pages/NotFoundScreen'
import { useNavigate } from 'react-router-dom';


function Footer() {
    const navigate = useNavigate()
    return (
        <>

            <footer className='d-flex justify-content-center'>
                <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 container '>

                    <div className="col pt-3 text-lg-start text-center">

                        <ul className='p-0 ps-lg-3'>
                            <li className="list-group-item pb-2"><a className="text-decoration-none text-reset" href="">Contactanos</a></li>
                            <li className="list-group-item pb-2"><a className="text-decoration-none text-reset" href="/error404">Recuperar Contraseña</a></li>
                            <li className="list-group-item"><a className="text-decoration-none text-reset" href="/error404">FAQ´s</a></li>
                        </ul>
                    </div>
                    <div className="col pt-md-3 text-lg-start text-center ">
                        <ul className='p-0 ps-lg-3'>
                            <li className="list-group-item pb-2"><a className="text-decoration-none text-reset" href="/error404">Sobre Nosotros</a></li>
                            <li className="list-group-item pb-2"><a className="text-decoration-none text-reset" href="/error404">Terminos y Condiciones</a></li>
                        </ul>
                    </div>
                    <div className="col col-md-12 d-flex align-items-center  ">
                        <div className='col d-flex justify-content-center my-lg-3'>
                            <button className="btn-reset mx-2" onClick={() => {navigate("/error404")}}>
                                <UilFacebook size="32"/>
                            </button>
                            <button className="btn-reset mx-4" onClick={() => {navigate("/error404")}}>
                                <UilInstagram size="32"/>
                            </button>
                            <button className="btn-reset mx-2" onClick={() => {navigate("/error404")}}>
                                <UilTwitter size="32"/>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer