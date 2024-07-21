import {  ClassSprites, SkillIcons } from "../assets/fe-child-files/Awakening-image-library"
import { useContext, useState, useEffect } from 'react'
import { PairingContext } from "./PairingContext"


export const  KidTwoCard = () => {

  const [tab, setTab] = useState('classes')
  const {childTwoData, fatherData,motherData} = useContext(PairingContext)

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedInherit, setSelectedInherit] = useState('');
  const [isMobile, setIsMobile] = useState(false)

  useEffect(()=>{
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  useEffect(() =>{
    setSelectedClass('')
    setSelectedSkill('')
    setSelectedInherit('')
  }, [childTwoData])

  const classChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  }
  
    const skillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSkill(event.target.value);
    }

    const inheritChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedInherit(event.target.value);
    }


  const onlyChild = childTwoData.name === ''
  const avatarParent = fatherData.name === 'AvatarM' || motherData.name === 'AvatarF'

  const tabSelect = (tabMode:string) =>{
    setTab(tabMode)
  }

	return (
		<div className={`unit-select  child-unit ${onlyChild ? 'hide' : ''}`}>

      <div className="unit-card-left">

        <div className="portrait-container">
              <img className="portrait" src={childTwoData.portrait} alt={`${childTwoData.name} Portrait`} />
        </div>

        <div>
          <div className="name-header">
            <h3>{childTwoData.name}</h3>
            <img src={childTwoData.sprite} alt="" />
          </div>
        </div>

      </div>

    <div className="unit-card-right">
    <div className={`btn-tabs ${isMobile ? 'hide' : ''}`}>
          <button className={`tab ${tab === 'classes' ? '' : 'tab-bottom-border'}`} onClick={()=>tabSelect('classes')}>Classes</button>
          <button className={`tab ${tab === 'skills' ? '' : 'tab-bottom-border'}`} onClick={()=>tabSelect('skills')}>Skills</button>
          <button className={`tab ${tab === 'inherit' ? '' : 'tab-bottom-border'}`} onClick={()=>tabSelect('inherit')}>Inherit</button>
        </div>

        <div className={`unit-details ${tab === 'classes' ? '' : 'hide'}`}>
        <h4 className={`${avatarParent ? 'hide' : ''}`}>Classes</h4>
            
          
        <h4>Classes</h4>
            <div className="icons-container">

      
            <select name="" id="" 
                    className={`${isMobile ? '' : 'hide'}`} onChange={classChange}>
                      {childTwoData.classes.map((c, index) => {
              const t = c;
              c = ClassSprites[c.replace(/ /g, '') + '_' + childTwoData.sex];
              return (
                <option key={index} value={t} >
                  {t}
                </option>
                        )
              })}
                      </select>

                      {selectedClass !== '' && <img src={ClassSprites[selectedClass.replace(/ /g, '') + '_' + childTwoData.sex] } alt="" />}

          {childTwoData.classes.map((c, index) => {
            const t = c
            c = ClassSprites[c.replace(/ /g, '') + '_' + childTwoData.sex]
            if(c == undefined) return

            return(
              <div className={`sprite-container ${isMobile ? 'hide' : ''}`} key={index}>
                <img className="sprite-img" src={c} alt="class" />
                <div className="details">
                  <p>{t}</p>
                  </div>
            </div>)
          })}
          </div>

          </div>

          <div className={`unit-details  ${tab === 'skills' || isMobile ? '' : 'hide'}`}>
        
          <h4>Skills</h4>
      
      <div className="icons-container">

      <select name="" id="" 
        className={`${isMobile ? '' : 'hide'}`} onChange={skillChange}>
          {childTwoData.skills.map((s, index) => {
            const t = s;
            if(s == undefined) return
            s = SkillIcons[s?.replace('+','Plus').replace(/ /g,'')]?.icon
            return (
              <option key={index} value={t} >
                {t}
              </option>
                      )
            })}
                    </select>

                    
          {selectedSkill !== '' && <img src={SkillIcons[selectedSkill.replace('+','Plus').replace(/ /g,'')]?.icon} alt="" />}


          {childTwoData.skills.filter(s => s !== undefined).map((s, index) => {
               const t = s
               const e = SkillIcons[s?.replace('+','Plus').replace(/ /g,'')]?.effect
               s = SkillIcons[s?.replace('+','Plus').replace(/ /g,'')]?.icon
                 if(s == undefined) return
               return(
                 <div className={`sprite-container ${isMobile ? 'hide' : ''}`} key={index}>
                   <img className="sprite-img"  src={s} alt="skill" />
                   <div className="details">
                     <p>{t}</p>{e}
                     </div>
            </div>)
          })}
          </div>
        </div>

        <div className={`unit-details  ${tab === 'inherit' || isMobile ? '' : 'hide'} `}>

        <h4>Inheritable</h4>
        <div className="icons-container">

        {childTwoData.inherited.length !== 0 && <select name="" id="" 
                  className={`${isMobile ? '' : 'hide'}`} onChange={inheritChange}>
                    {Array.isArray(childTwoData.inherited) &&
            childTwoData.inherited.map((c, index) => {
              
            const t = c;
            c = ClassSprites[c.replace(/ /g, '') + '_' + childTwoData.sex];
            return (
              <option key={index} value={t} >
                {t}
              </option>
                      )
            })}
                  </select>}

                  {selectedInherit !== '' && <img src={SkillIcons[selectedInherit.replace('+','Plus').replace(/ /g,'')]?.icon} alt="" />}

        <p className={`${childTwoData.inherited.length === 0 ? '' : 'hide'}`}>All skills accessible</p>
              
              <div className="icons-container">
              {Array.isArray(childTwoData.inherited) &&
                childTwoData.inherited.map((s:string, index:number) => {
                  const t = s
                  if(s == undefined) return
                  const e = SkillIcons[s?.replace('+','Plus').replace(/ /g,'')]?.effect
                s = SkillIcons[s?.replace('+','Plus').replace(/ /g,'')]?.icon
                if(s == undefined) return
                  return(
                <div className={`sprite-container ${isMobile ? 'hide' : ''}`} key={index}>
                  <img className="sprite-img"  src={s} alt="skill" />
                  <div className="details">
                      <p>{t}</p>{e}
                  </div>
                </div>)
              })}
          </div>
            </div>
            </div>

        </div>
      </div>
	)
}