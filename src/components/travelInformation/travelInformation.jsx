import React, { useEffect, useState } from "react"
import './travelInformation.css'
import Travels from "./steps/travels/travels";
import FiveTravels from "./steps/fiveTravels/fiveTravels";
import TravelInformations from "./steps/travelInformations/travelInformations";
import ContactPoint from "./steps/contactPoint/contactPoint";
import Companion from "./steps/companion/companion";
import Payer from "./steps/payer/payer";



function TravelInformation (props) {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set()); 
    const [maritalStatus, setMaritalStatus] = useState(null)

  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {   
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }   
      
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    
      
      setSkipped(newSkipped);
      if(activeStep === 5){
        props.onTravelInformationChange();
      }
    };
  
    const handleBack = () => {    
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }; 
    
    const [selectedStatus, setSelectedStatus] = useState('');

    const handleStatusChange = (status) => {
        setSelectedStatus(status);  
    };

    const allComponents = [
        <Travels key="travels"/>,
        <FiveTravels key="fiveTravels"/>,   
        <TravelInformations key="travelInformations"/>,
        <ContactPoint key="contactPoint"/>,
        <Companion key="companion"/>,
        <Payer key="payer"/>   
    ];

  return (        
    <div className='div-flex'>   
    <div className="div-margin" style={{width:'100%'}}>
        <div >
            {allComponents[activeStep]}    
        </div>

        <div style={{display:'flex', justifyContent:'end', marginRight: '-2rem',paddingBottom:'2rem'}}>
          <div style={{paddingRight:'1rem'}}>
            <button 
            type='button'
            className='button-style'
            disabled={activeStep === 0}
            onClick={handleBack}
            style={{display: activeStep === 0 ? 'none' : ''}}
            >
            <span className='font-button'>Voltar</span>
            </button>
          </div>
          <div>
            <button 
            type='button'
            className='button-style'
            onClick={handleNext}
            >
                <span className='font-button'>{'Próxima'}</span>
            </button>  
          </div>
        </div>
    </div>
</div>      
  )
}

export default TravelInformation
