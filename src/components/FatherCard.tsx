import {  ClassSprites, SkillIcons } from "../assets/fe-child-files/Awakening-image-library"
import { useContext, useState, useEffect} from 'react'
import { PairingContext } from "./PairingContext"


export const  FatherCard = () => {

  const [onClassTab, setOnClassTab] = useState(true)
  const {fatherData} = useContext(PairingContext)

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isMobile, setIsMobile] = useState(false)

  const classChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  }
  
    const skillChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSkill(event.target.value);
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
  }, [fatherData])

  const absentFather = fatherData.name === ''
  const avatarParent = fatherData.name === 'AvatarM'
  const classyParent = fatherData.name === 'AvatarM' && onClassTab




  useEffect(() => {
    setOnClassTab(true)
  }, [fatherData.name])

  const tabSelect = (tab:string) =>{
    if(tab === 'classes'){
    setOnClassTab(true)
  }else{
    setOnClassTab(false)
  }
  }


	return (

    <>
      <div className={`absent-parent father-container  ${absentFather? '' : 'hide'}`}>
        <h3>Select a Father</h3>
      </div>

      <div className={`father-container parent-unit ${absentFather ? 'hide' : ''}`}>

        <div className="unit-card-left">
          <div className="portrait-container">
            <img className="portrait" src={fatherData.portrait} alt={`${fatherData.name} Portrait`} />
          </div>

          <div className="name-header">
            <h3>{fatherData.name}</h3>
            <img src={fatherData.sprite} alt="" />
          </div>
        </div>

        <div className="unit-card-right">

          <div className={`btn-tabs ${avatarParent && !isMobile ? '' : 'hide'}`}>
            <button className={`tab ${onClassTab ? '' : 'tab-bottom-border'}`} onClick={()=>tabSelect('classes')}>Classes</button>
            <button className={`tab ${onClassTab ? 'tab-bottom-border' : ''}`} onClick={()=>tabSelect('skills')}>Skills</button>
          </div>

          <div className={`unit-details ${onClassTab ? '' : 'hide'}`}>
              <h4 className=''>Classes</h4>

            <div className="icons-container">



               <select name="" id="" 
                    className={`${isMobile ? '' : 'hide'}`} onChange={classChange}>
                      {fatherData.classes.map((c, index) => {
              const t = c;
              c = ClassSprites[c.replace(/ /g, '') + '_' + fatherData.sex];
              return (
                <option key={index} value={t} >
                  {t}
                </option>
                        )
              })}
                      </select>
              {selectedClass !== '' && <img src={ClassSprites[selectedClass.replace(/ /g, '') + '_' + fatherData.sex] } alt="" />}

              {fatherData.classes.map((c, index) => {
                const t = c
                c = ClassSprites[c.replace(/ /g, '') + '_' + fatherData.sex] 
                return(
                <div className={`sprite-container ${isMobile ? 'hide' : ''}`}  key={index}>
                  <img className="sprite-img"  src={c} alt="class"  />
                  <div className="details">
                    <p>{t}</p>
                  </div>
                </div>)
              })}
            </div>
          </div>

          <div className={`unit-details ${isMobile && avatarParent ? '' : 'hide'} `}>
            <h4 className=''>Skills</h4>

              <div className="icons-container">


              <select name="" id="" 
              className={`${isMobile ? '' : 'hide'}`} onChange={skillChange}>
                {fatherData.skills.filter(s => s !== undefined).map((s, index) => {
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
              </div>
          </div>

          <div className={`unit-details ${classyParent ? 'hide' : ''} `}>

          <h4 className=''>Skills</h4>

          <div className="icons-container">


          <select name="" id="" 
           className={`${isMobile ? '' : 'hide'}`} onChange={skillChange}>
            {fatherData.skills.map((s, index) => {

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


          {fatherData.skills.map((s, index) => {
            const t = s
            const e = SkillIcons[s?.replace('+','Plus').replace(/ /g,'')]?.effect
            s = SkillIcons[s?.replace('+','Plus').replace(/ /g,'')]?.icon
            if(s == undefined) return
            return(
            <div className={`sprite-container ${isMobile ? 'hide' : ''}`}  key={index}>
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

    </>

	)
}