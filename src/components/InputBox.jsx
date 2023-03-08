const InputBox = (props) => {
    const {id, name, type, value, handleChange, label, isFieldActive} = props;

    const getClass = (isFieldActive) => {
        if (isFieldActive){
            return "active";
        } else {
            return "";
        }
    }

    return (
        <div className="form-input-box">
            <input 
                id={id} 
                name={name}
                className="form-input" 
                type={type}
                value={value}
                onChange={handleChange}
            />
            <label 
                htmlFor={id}
                className={`form-input-label ${getClass(isFieldActive)}`}>{label}</label>
        </div>
    )
}

export default InputBox;