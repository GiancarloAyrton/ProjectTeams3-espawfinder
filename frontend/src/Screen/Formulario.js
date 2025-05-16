// AboutScreen.js
import React, { useState } from 'react';
import Footer from '../components/Footer';
import LostPetForm from '../components/LostPetForm';
import FoundPetForm from '../components/FoundPetForm';
import AdoptionForm from '../components/AdoptionPetForm';
import LookingForMateForm from '../components/LookingForMateForm';
import SolidarityHelpForm from '../components/SolidarityHelpForm';
import './../css/customFormulario.css'
import './../css/PetFormsContainer.css'

const uuid = generateUUID(); // Generar un UUID único
localStorage.setItem('anonymousPostUUID', uuid); // Guardar el UUID en local storage

function generateUUID() {
  const existingUUID = localStorage.getItem('anonymousPostUUID');
  if (existingUUID) {
    return existingUUID;
  } else {
    const newUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    localStorage.setItem('anonymousPostUUID', newUUID);
    return newUUID;
  }
}

const PetPostForm = () => {
  const [selectedForm, setSelectedForm] = useState('lost');

  const renderForm = () => {
    switch (selectedForm) {
      case 'lost':
        return <LostPetForm />;
      case 'found':
        return <FoundPetForm />;
      case 'adoption':
        return <AdoptionForm />;
      case 'lookingForMate':
        return <LookingForMateForm />;
      case 'solidarityHelp':
        return <SolidarityHelpForm/>
      default:
        return <LostPetForm />;
    }
  };
  return (
    <div className='centrar-todo'>
    <div class="formulario jumbotron jumbotron-fluid" data-center="background-size: 100%;"
         data-top-bottom="background-size: 140%;">
         <div class="container" >
            <div class="jumbo-heading" data-aos="fade-up">
               <h1 className='Busqueda'>Busqueda</h1>
               <div class="breadcrumb-container">
               <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page"> Busqueda</li>
                  </ol>
               </nav>
               </div>
            </div>
         </div>
         <style>
        {`
          #preview {
            height: 200px;
            object-fit: cover;
          }
        `}
      </style>
    </div>
    
    <ul className="nav nav-pills category-isotope center-nav mt-4 btn-form">
        <li className="nav-item">
          <button className={`nav-link ${selectedForm === 'lost' ? 'active' : ''}`} onClick={() => setSelectedForm('lost')}>Perdido</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${selectedForm === 'found' ? 'active' : ''}`} onClick={() => setSelectedForm('found')}>Encontrado</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${selectedForm === 'adoption' ? 'active' : ''}`} onClick={() => setSelectedForm('adoption')}>Adopción</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${selectedForm === 'lookingForMate' ? 'active' : ''}`} onClick={() => setSelectedForm('lookingForMate')}>Busca Pareja</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${selectedForm === 'solidarityHelp' ? 'active' : ''}`} onClick={() => setSelectedForm('solidarityHelp')}>Ayuda Solidaria</button>
        </li>
      </ul>

      {renderForm()}
    
    
    <Footer/>
    </div>
  );
};

export default PetPostForm;