import './end.css'
import imageHome6 from '../../assets/imagem-6.png'

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function End(props) {
  const [storedData, setStoredData] = useState('')

  const addFamily = () =>{   
    props.onEndChange();
  }

  const deleteLocalStorage = () => {
    localStorage.removeItem("tipoForm");
    localStorage.removeItem("primaryMember");
  }

  useEffect(() => {    
    
    const data = localStorage.getItem("tipoForm");
    setStoredData(data);
}, []);

  return (
    <>
      <div>
        <div className='div-flexEnd'>
          <div className='div-home-head-info margin-div margin-left'>
            <div className='text-align font-size-title'>
              <span className='font-color'>Parabéns</span>             
            </div>
            <div className='text-align font-size-title-end'>
              <br /><span className='font-color-3'>
              Você esta mais perto de ter o seu visto, em breve entraremos em contato para trazer novidades!
              </span>
            </div>
            {storedData === "Apenas para mim"? (
            <div className='padding-button-end'>
              <Link to="/">
                <button type='button' className='button-style-end' onClick={deleteLocalStorage}>
                  <span className='font-button'>Voltar para a home</span>
                </button>
              </Link>
            </div>
            ):(
            <div className='button_gap' style={{display:'flex'}}>
              <div className='padding-button-end' style={{paddingRight:'1rem'}}>
                <Link to="/">
                  <button type='button' className='button-style-end-2' onClick={deleteLocalStorage}>
                    <span className='font-button-2'>Voltar para a home</span>
                  </button>
                </Link>
              </div>

              <div className='padding-button-end'>                
                  <button type='button' className='button-style-end' onClick={addFamily}>
                    <span className='font-button'>Próximo familiar</span>
                  </button>                
              </div>
            </div>
            )}
          </div>
          <div>
            <img className='imgEnd' src={imageHome6} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default End
