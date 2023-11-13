import './home.css'
import imageHome1 from '../../assets/imagem-1.png';
import imageHome2 from '../../assets/imagem-2.png';
import imageHome3 from '../../assets/imagem-3.png';
import imageHome4 from '../../assets/imagem-4.png';
import imageHome5 from '../../assets/imagem-5.png';
import { Link } from 'react-router-dom';

function Home() {

  return (
    <>
      <div>
        <div className='div-flex'>
          <div className='div-home-head-info margin-div margin-left'>
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
            <div className='padding-top'>
              <Link to="/initialInformation">
                <button type='button' className='button-style'>
                  <span className='font-button'>Iniciar</span>
                </button>
              </Link>
            </div>
          </div>
          <div>
            <img src={imageHome1} alt="" />
          </div>
        </div>
        <div className='padding-bottom'>
          <div className='margin-left font-title-div-2 font-color-2 padding-bottom'>
            <span>Informações importantes</span>
          </div>
          <div className='div-flex-docs margin-div'>
            <div className='dimension-card'>
              <div className='div-flex'>
                <div className='div-home-head-info text-align font-card font-color-2'>
                  <span >CPF e RG, carteira de motorista e carteira de trabalho</span>
                </div>
                <img src={imageHome2} alt="" style={{ height: '148px', width: '148px' }} />
              </div>
            </div>
            <div className='dimension-card'>
              <div className='div-flex'>
                <div className='div-home-head-info text-align font-card font-color-2'>
                  <span>Comprovante de residência</span>
                </div>
                <img src={imageHome3} alt="" style={{ height: '148px', width: '148px' }} />
              </div>
            </div>
            <div className='dimension-card'>
              <div className='div-flex'>
                <div className='div-home-head-info text-align font-card font-color-2'>
                  <span>Passaporte novo <br /> e antigo</span>
                </div>
                <img src={imageHome4} alt="" style={{ height: '148px', width: '148px' }} />
              </div>
            </div>
            <div className='dimension-card'>
              <div className='div-flex'>
                <div className='div-home-head-info text-align font-card font-color-2'>
                  <span>Certidão de nascimento ou casamento</span>
                </div>
                <img src={imageHome5} alt="" style={{ height: '148px', width: '148px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
