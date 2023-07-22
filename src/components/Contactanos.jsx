import React , {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import ContactanosModal from './modals/ContactanosModal'
import { UilArrowRight } from '@iconscout/react-unicons'


function Contactanos() {
    const [show, setShow] = useState(false);

    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (

        <>
        <div className="container row mx-auto flex-md-row-reverse">
            <div className="col-lg-6 d-flex justify-content-center align-items-center mt-3 mt-lg-0">
                <div className='text-center'>
                    <h2 style={{ color: "#866a80" }}>Contáctanos</h2>
                    <p style={{ color: "#4d3147" }}>Si necesitas ayuda puedes</p>
                    <p style={{ color: "#4d3147" }}>contactar al equipo de</p>
                    <p style={{ color: "#4d3147" }}>SysSolutions</p>
                </div>
            </div>
            <div className="col-lg-6 py-3">
                <form action="">
                    <div className="col-md-8 mx-auto">
                        <input type="text" className="form-control rounded-4 " placeholder="Nombre" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required />
                        <input type="email" className="form-control rounded-4 my-3" placeholder="Email" style={{ background: "#c9b7c7", boxShadow: "inset 0 2px 3px #4d3147" }} required />
                    </div>
                    <div className="col-md-8 col-lg-12 mx-auto">
                        <textarea className="form-control rounded-4 h-100" placeholder="Escribe un mensaje" style={{ background: "#c9b7c7 ", boxShadow: "inset 0 2px 3px #4d3147" }} rows="4" required ></textarea>
                    </div>
                    <div className='text-center mt-3'>
                        <button className='col-4 btn text-white rounded-4 ' style={{ background: "#4d3147 " }} onClick={handleShow} >Enviar <UilArrowRight/></button>
                    </div>
                </form>
            </div>

        </div>

        <ContactanosModal show={show} handleClose={handleClose}/>
        </>
    )
}

export default Contactanos