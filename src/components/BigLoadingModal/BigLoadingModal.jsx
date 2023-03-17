import "./style.css";

const BigLoadingModal = () => {
    return (
        <div className='modal'>
        <div className='modal-content'>
          <div className='loader'></div>
          <div className='modal-text'>Carregando...</div>
        </div>
      </div>
    )
}

export default BigLoadingModal;