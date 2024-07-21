import { UnitImages } from '../assets/fe-child-files/Awakening-image-library'
import { PairingContext } from './PairingContext'
import {useContext} from 'react'


export const SelectParent = () => {


const {setParent, hitchedList, addPairing, closedListMobileHandle} = useContext(PairingContext)

const isSingle = (name:string) =>{
  return hitchedList.indexOf(name) == -1
}

const parentChangeM = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setParent(event.target.value, 'm');
};
const parentChangeF = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setParent(event.target.value, 'f');
};

	return(
  <>

    <div className="mobile-parent-select-container ">
    <select value={this} onChange={parentChangeM} className="mobile-parent-select select-father">
        <option disabled selected>Father</option>
        {Object.keys(UnitImages).map((unit, index)=> {
          if(UnitImages[unit].male){
            return   (
          <option className={`sprite-container ${unit} `} disabled={!isSingle(unit)} 
              key={index} onClick={()=>setParent(unit, 'm')}  >
            {unit}
          </option>
        )}})}
      </select>

    <select  value={this} onChange={parentChangeF}  className="mobile-parent-select select-mother">
        <option disabled selected>Mother</option>
        {Object.keys(UnitImages).map((unit, index)=> {
          if(UnitImages[unit].male === false){
            return   (
          <option className={`sprite-container ${unit} `} disabled={!isSingle(unit)} 
              key={index} onClick={()=>setParent(unit, 'f')} onChange={()=>setParent(unit, 'f')}>
            {unit}
          </option>
        )}})}
      </select>

      <button className='mobile-btn btn-green' onClick={addPairing}>Add</button>
      <button className='mobile-btn btn-blue' onClick={closedListMobileHandle}>Paired List</button>

    </div>

    <div id="parent-select">

        <div  className='parent-container father-container'>
          <h4>Fathers:</h4>

        {Object.keys(UnitImages).map((unit, index) => {
          if(UnitImages[unit].male){
          return   (
          <div className={`sprite-container ${isSingle(unit) ? '' : 'grayed'}`} key={index}>
            
            <img key={index} className='sprite-img'   src={UnitImages[unit].sprite}
              alt={`${unit} Sprite`} onClick={()=>setParent(unit, 'm')} />

            <div className="details">
                <p>{unit}</p>
            </div>
          </div>
          )}
        })}
  
        </div>

        <div className='mother-container parent-container'>
          <h4>Mothers:</h4>
          
        {Object.keys(UnitImages).map((unit, index) => {
          if(UnitImages[unit].male === false){
            return   (
            <div className={`sprite-container ${isSingle(unit) ? '' : 'grayed'}`} key={index}>

            <img className='sprite-img' key={index}
              src={UnitImages[unit].sprite}  alt={`${unit} Sprite`} onClick={()=>setParent(unit, 'f')} />

              <div className="details">
                <p>{unit}</p>
              </div>
            </div>
            )}
        })}
  
        </div>

    </div>
    </>      
	)
}