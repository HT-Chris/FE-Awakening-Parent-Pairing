import { KidOneCard } from '../components/KidOneCard'
import { KidTwoCard } from '../components/KidTwoCard'
import { PairingContext } from './PairingContext'
import { useContext, useState, useEffect} from 'react'
import { nonCompatibleCouple } from '../assets/fe-child-files/classes_and_all_skills'


export const KidSection = () => {

const {childOneData,childTwoData, fatherData, motherData} = useContext(PairingContext)
const [showChildOne, setShowChildOne] = useState(true)
const isChildless = childOneData.name === ''

const childBtnHandler = (kid:string) => {
    if(kid == 'one'){
      setShowChildOne(true)
    }else{
      setShowChildOne(false)
    }  
  }

  useEffect(()=>{
    setShowChildOne(true)
  },[fatherData.name])



const noBabyMessage = (dad:string, mom:string) => {
    
    for( const pair of nonCompatibleCouple){
        
            if(dad !== 'AvatarM'){
                switch (mom){
                    case 'Tiki': return 'She might be a little too old for the guy' ;
                    break;
                    case 'Anna': return  "I ain't saying she's a gold digger" ;
                    break;
                    case 'Flavia': return "She's really focusing on her career" ;
                    break;
                    case "Say'ri": return "She don't neeeeeeed no man!" ;
                    break;
                }
            }

            if(dad === 'Basilio' && mom !== "AvatarF"){
                return "Is it the one eye? It's the one eye isn't it"
            }

            if( pair[0]=== dad && pair[1]=== mom){
                return pair[2]
            }
        }
                return "No baby"
    }


    

    return (
            <>
            <div className={`baby-message-mobile child-unit ${isChildless ? '' : 'hide'}`}>
                <h3>
                    {noBabyMessage(fatherData.name, motherData.name)}
                </h3>
            </div>
           
            <div id={` ${isChildless ? 'hide' : 'child-section'}`} className={`child-con-mobile children-container ${isChildless ? 'hide' : ''}`} >

                <div className="child-btns">
                <button className={`btn-child  mobile-tab ${showChildOne? '' : 'child-border'} ${childTwoData.name === '' ? 'hide' : ''}`} onClick={() => childBtnHandler('one')}>1st Child</button>
                <button className={`btn-child  mobile-tab ${showChildOne? 'child-border' : ''} ${ childTwoData.name === '' ? 'hide' : ''}`} onClick={() => childBtnHandler('two')}>2nd Child</button>
                </div>
            
                <div className={`${showChildOne ? 'width-100' : 'hide'}`}>
                    <KidOneCard/>
                </div>
                <div className={`${showChildOne || childTwoData.name === '' ? 'hide' : 'width-100'}`}>
                    <KidTwoCard/>
                </div>
            </div>

            
            
            <div className={`baby-message ${isChildless ? '' : 'hide'}`}>
                <h3>
                    {noBabyMessage(fatherData.name, motherData.name)}
                </h3>
            </div>
            
            <div id={`${isChildless ? 'hide' : 'child-section'}`} className={`children-container ${isChildless ? 'hide ' : ''} child-con  `} >

                
            
                <div className={` kid-box ${showChildOne ? 'width-100' : 'hide'}`}>
                    <KidOneCard/>
                </div>
                <div className={` kid-box ${ childTwoData.name === 'width-100' ? 'hide' : ''}`}>
                    <KidTwoCard/>
                </div>
            </div>
            
            
            
            </>

    )
}