import 'bootstrap/dist/css/bootstrap.css'
import { UilFacebook, UilInstagram, UilTwitter } from '@iconscout/react-unicons'

function Footer() {
    return (
        <>

            <footer className='d-flex justify-content-center'>
                <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 container '>

                    <div className="col pt-3 text-lg-start text-center">

                        <ul className='p-0 ps-lg-3'>
                            <li className="list-group-item pb-2"><a className="text-decoration-none text-reset" href="">Contactanos</a></li>
                            <li className="list-group-item pb-2"><a className="text-decoration-none text-reset" href="">Recuperar Contraseña</a></li>
                            <li className="list-group-item"><a className="text-decoration-none text-reset" href="">FAQ´s</a></li>
                        </ul>
                    </div>
                    <div className="col pt-md-3 text-lg-start text-center ">
                        <ul className='p-0 ps-lg-3'>
                            <li className="list-group-item pb-2"><a className="text-decoration-none text-reset" href="">Sobre Nosotros</a></li>
                            <li className="list-group-item pb-2"><a className="text-decoration-none text-reset" href="">Terminos y Condiciones</a></li>
                        </ul>
                    </div>
                    <div className="col col-md-12 d-flex align-items-center  ">
                        <div className='col d-flex justify-content-center my-lg-3'>
                            <UilFacebook size="32"  />
                            <UilInstagram size="32" className="mx-3"/>
                            <UilTwitter size="32" />
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer