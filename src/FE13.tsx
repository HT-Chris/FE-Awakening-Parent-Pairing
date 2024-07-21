import { PairingContextProvider } from './components/PairingContext'
import { FatherCard } from './components/FatherCard'
import { MotherCard } from './components/MotherCard'
import { KidSection } from './components/KidSection'
import { SelectParent } from './components/SelectParents'
import { SavedPairings } from './components/SavedPairings'
import { useState } from 'react'
import  logo  from './assets/fe_child/title/Fire_Emblem_Awakening_logo.webp' 

import './FE13App.css'

export const FE13 = () => {
  
  const [showFather, setShowFather] = useState(true)

  const parentBtnHandler = (parent:string) => {
    if(parent == 'father'){
      setShowFather(true)
    }else{
      setShowFather(false)
    }
  }
  return (
    <>
    <PairingContextProvider>
 
    <div id="body-container-fe13" className='fe13-app'>
    <img src={logo} id='logo-mobile' alt="Fire Emblem Awakening Logo" />
      <div id="body-left">
        <SelectParent/>
      <div id="parent-pairing-container">
       <div id="parents-selected">

          <div className="parent-btns">
            <button className={` btn-father mobile-tab ${showFather? 'father-border' : ''}`} onClick={() => parentBtnHandler('father')}>Father</button>
            <button className={` btn-mother mobile-tab ${showFather? '' : 'mother-border'}`} onClick={() => parentBtnHandler('mother')}>Mother</button>
            </div>
          
          <div id="mobile-parents">
            <div className={` ${showFather ? 'width-100' : 'hide'}`}>
              <FatherCard/>
            </div>
            <div className={` ${showFather ? 'hide' : 'width-100'}`}>
              <MotherCard/>
            </div>
          </div>

          <div id="desk-parents">
          <FatherCard/>
          <MotherCard/>
          </div>

       </div>
      <KidSection/>
      </div>
    </div>

    <div id="body-right">
      <SavedPairings/>
    </div>
  </div>
    
    </PairingContextProvider>
    </>
  )
}

