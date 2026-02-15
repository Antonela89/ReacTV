import colors from '../../config/config.js'

const Checkbox = ({texto, onChange, checked, value, name }) => {
    return (
    <div style={{width:'30%', color:`${colors.blanco}`, margin:'3rem', display: 'flex', alignItems:'center', justifyContent:'center'}}>
        <label style={{ flex:'inline-block', fontSize:'1.5rem'}}>
            <input
                style={{ marginRight:'1rem'}}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {texto}
        </label>
    </div>
    )
}

export default Checkbox
