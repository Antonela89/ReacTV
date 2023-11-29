<<<<<<< HEAD
import emailjs from "emailjs-com" 

import Titulo from '../Titulo/Titulo'
import BotonForm from '../Boton/BotonForm/BotonForm'
=======
import emailjs from "emailjs-com"; 
import "./contact.css";
import Titulo from '../Titulo/Titulo';
import BotonForm from '../Boton/BotonForm/BotonForm';
>>>>>>> 010b642a593beb5a6c45ec61c92a709ed537ff18
import { useState } from "react";
import "./contact.css";

const Contact = () => {
    const [formSubmit, setFormSubmit] = useState(false)

      const handleSubmit = async(e) => {
        e.preventDefault();
        emailjs.sendForm("service_074lwji","template_yd0tvfw", e.target, "u8IBa9FQG0gH1632j")
        .then(res=>{
            console.log(res)
        })
        setFormSubmit(true)
      };

  return (
    <div className="contact">    
        <Titulo texto={'contacto'} />
        {formSubmit ? (<div className="formSubmit">
            <h3>Muchas gracias por comunicarse con nosotros.</h3>
                <p>En breve nos pondremos en contacto.</p>
                <div onClick={()=>setFormSubmit(false)}>
                  <BotonForm texto={'volver'} />
                </div>
                {/* <div className="btn-formSubmit"> <button className="btn btn-outline-secondary" onClick={()=>setFormSubmit(false)}>Volver</button></div> */}
        </div>) : 
        <form action="" onSubmit={handleSubmit}>
          <div className="cont-input">
            <label htmlFor="name">Nombre:</label>
            <input type="text" name="name" id="name" placeholder="Nombre"/>
          </div>
          <div className="cont-input">
            <label htmlFor="telefono">Teléfono:</label>
            <input type="text" name="telefono" id="telefono" placeholder="Teléfono"/>
          </div>
          <div className="cont-input">
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" id="email" placeholder="Email"/>
          </div>
          <div className="cont-input">
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea name="mensaje" id="mensaje" placeholder="Mensaje">
            </textarea>
          </div>
            <BotonForm texto={'enviar'}/>
        </form>
      }
    </div>
  )
}

export default Contact