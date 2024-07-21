import {  ClassSprites, SkillIcons } from "../assets/fe-child-files/Awakening-image-library"
import {useContext, useState, useEffect} from 'react'
import { PairingContext } from "./PairingContext"


export const  KidOneCard = () => {

  
  const [tab, setTab] = useState('classes')
  const {childOneData} = useContext(PairingContext)

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedInherit, setSelectedInherit] = useState('');
  const [isMobile, setIsMobile] = useState(false)

  const classChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  }
  
    const skillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSkill(event.target.value);
    }
    const inheritChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedInherit(event.target.value);
    }

  
  const tabSelect = (tabMode:string) =>{
    setTab(tabMode)
  }
  
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

  }, [childOneData])



	return (
		<div className="unit-select child-unit">
      <div className="unit-card-left">
        <div className="portrait-container">
          <img className="portrait" src={childOneData.portrait} alt={`${childOneData.name} Portrait`} />
        </div>
          <div>
          <div className="name-header">
            <h3>{childOneData.name}</h3>
            <img src={childOneData.sprite} alt="" />
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
        
              <h4>Classes</h4>
            <div className="icons-container">

      
            <select name="" id="" 
                    className={`${isMobile ? '' : 'hide'}`} onChange={classChange}>
                      {childOneData.classes.map((c, index) => {
              const t = c;
              c = ClassSprites[c.replace(/ /g, '') + '_' + childOneData.sex];
              return (
                <option key={index} value={t} >
                  {t}
                </option>
                        )
              })}
                      </select>
              {selectedClass !== '' && <img src={ClassSprites[selectedClass.replace(/ /g, '') + '_' + childOneData.sex] } alt="" />}
                      

          {childOneData.classes.map((c, index) => {
            const t = c
            c = ClassSprites[c.replace(/ /g, '') + '_' + childOneData.sex]
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

          <div className={`unit-details   ${tab === 'skills' || isMobile ? '' : 'hide'}`}>
            <h4>Skills</h4>
      
            <div className="icons-container">

            <select name="" id="" 
              className={`${isMobile ? '' : 'hide'}`} onChange={skillChange}>
                {childOneData.skills.filter(s => s !== undefined).map((s, index) => {
                  if(s == undefined) return
                  const t = s;
                  s = SkillIcons[s?.replace('+','Plus').replace(/ /g,'')]?.icon
                  return (
                    <option key={index} value={t} >
                      {t}
                    </option>
                            )
                  })}
                          </select>
              {selectedSkill !== '' && <img src={SkillIcons[selectedSkill.replace('+','Plus').replace(/ /g,'')]?.icon} alt="" />}


          {childOneData.skills.map((s, index) => {
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

          <div className={`unit-details  ${tab === 'inherit' || isMobile ? '' : 'hide'}`}>

            <h4>Inheritable</h4>
            <div className="icons-container">

            {childOneData.inherited.length !== 0 && <select name="" id="" 
                    className={`${isMobile ? '' : 'hide'}`} onChange={inheritChange}>
                      {Array.isArray(childOneData.inherited) &&
              childOneData.inherited.map((c, index) => {
              const t = c;
              c = ClassSprites[c.replace(/ /g, '') + '_' + childOneData.sex];
              return (
                <option key={index} value={t} >
                  {t}
                </option>
                        )
              })}
                      </select>}

          {selectedInherit !== '' && <img src={SkillIcons[selectedInherit.replace('+','Plus').replace(/ /g,'')]?.icon} alt="" />}


        <p className={`${childOneData.inherited.length === 0 ? '' : 'hide'}`}>All skills accessible</p>
              
              <div className="icons-container">
              {Array.isArray(childOneData.inherited) &&
              childOneData.inherited.map((s:string, index:number) => {
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
      </div>
      </div>

    </div>
	)
}