import './home.css'
import imageHome1 from '../../assets/imagem-1.png';
import imageHome2 from '../../assets/imagem-2.png';
import imageHome3 from '../../assets/imagem-3.png';
import imageHome4 from '../../assets/imagem-4.png';
import imageHome5 from '../../assets/imagem-5.png';
import { Link } from 'react-router-dom';

import { useEffect } from 'react';
import {useMobile} from "../../dataContext/mobileContext.jsx";


function Home() {

  const { isMobile } = useMobile();

  

useEffect(() => {
  localStorage.removeItem("primaryMember")
}, [])
  return (
    <>
      <div>
        <div className='div-flex'>
          <div className='div-head-info margin-div margin-left'>
            <div className='text-align font-size-title'>
              <span className='font-color'>Visto simplificado</span><br />
              <span className='font-color-2'>em poucos minutos!</span>
            </div>
            <div className='text-align font-size-title-2'>
              <br /><span className='font-color-3'>
                Você esta a poucos passos para tirar o seu visto.
                Antes de iniciar, separe alguns minutos e certifique-se
                de ter todas as informações citadas abaixo.
              </span>
            </div>
            {
              (!isMobile)
                ?
                  <div className='padding-top botao-iniciar-top'>
                    <Link to="/initialInformation">
                      <button type='button' className='button-style'>
                        <span className='font-button'>Iniciar</span>
                      </button>
                    </Link>
                  </div>
                : ""
            }
          </div>
          {
            (!isMobile)
              ?
                <div className="imagem">
                  <img src={imageHome1} alt="" />
                </div>
                : ""
          }
        </div>
        {
          (isMobile)
              ?
              <div className="imagem">
                <img src={imageHome1} alt="" />
              </div>
              : ""
        }
        <div className='padding-bottom'>
          {
            (!isMobile)
              ?
                <div className='informacoes-importante margin-left font-title-div-2 font-color-2 padding-bottom'>
                  <span>Informações importantes</span>
                </div>
                :""
          }
          <div className='div-flex-docs margin-div'>
            <div className='dimension-card'>
              <div className='div-flex'>
                <div className='div-head-info text-align font-card font-color-2'>
                  <span >CPF e RG, carteira de motorista e carteira de trabalho</span>
                </div>
                <img src={imageHome2} alt="" style={{ height: '148px', width: '148px' }} />
              </div>
            </div>
            <div className='dimension-card'>
              <div className='div-flex'>
                <div className='div-head-info text-align font-card font-color-2'>
                  <span>Comprovante de residência</span>
                </div>
                <img src={imageHome3} alt="" style={{ height: '148px', width: '148px' }} />
              </div>
            </div>
            <div className='dimension-card'>
              <div className='div-flex'>
                <div className='div-head-info text-align font-card font-color-2'>
                  <span>Passaporte novo <br /> e antigo</span>
                </div>
                <img src={imageHome4} alt="" style={{ height: '148px', width: '148px' }} />
              </div>
            </div>
            <div className='dimension-card'>
              <div className='div-flex'>
                <div className='div-head-info text-align font-card font-color-2'>
                  <span>Certidão de nascimento ou casamento</span>
                </div>
                <img src={imageHome5} alt="" style={{ height: '148px', width: '148px' }} />
              </div>
            </div>
            {
              isMobile
                  ?
                  <div className='botao-iniciar-bot'>
                    <Link to="/initialInformation">
                      <button type='button' className='button-style'>
                        <span className='font-button'>Iniciar</span>
                      </button>
                    </Link>
                  </div>
                  : ""
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
