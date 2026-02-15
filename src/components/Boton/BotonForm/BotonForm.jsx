import './BotonForm.css';

const BotonForm = ({texto,width, onClick}) => {
    return (
        <div className="cont-btn">
            <button type='submit' className='BotonForm' style={{width:width}} onClick={onClick}>{texto}</button>
        </div>
    )
}

export default BotonForm;
