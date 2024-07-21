import {createContext, ReactNode, useState, useEffect} from 'react'
import {baby, playableUnits,} from '../assets/fe-child-files/classes_and_all_skills'
import { UnitImages } from '../assets/fe-child-files/Awakening-image-library'


type UnitData={
    name:string,
    sex:string,
    portrait:string,
    sprite: string,
    classes:string[],
    skills:string[],
    [key:string] : string | string[],
}
type UnitKidData={
    name:string,
    sex:string,
    portrait:string,
    sprite: string,
    classes:string[],
    skills:string[],
    inherited:string[],
    [key:string] : string | string[],
}

export type PairingProps = {
    keyIndex: number,
    data: { [key: string]: { sprite: string } };
  };



type PairingListType  = Array<{ [key: string]: { sprite: string } }>;


export type Pairing<D extends string, M extends string, L extends string, J extends string,>  = {
    [K in D]:{ sprite:string}
    } & {
    [K in M]:{ sprite:string}
    } & {
    [K in L]:{  sprite:string}
    } & {
    [K in J]?:{ sprite:string}
    }




type PairingContext = {
    fatherData: UnitData, 
    motherData: UnitData,
    childOneData: UnitData,
    childTwoData: UnitData,
    pairingList: PairingListType,
    selectedPairing: number,
    hitchedList: string[],
    closedListMobile: boolean,
    setParent: (parent:string, sex:string) => void, 
    addPairing: () => void,
    returnToDisplay: () => void,
    selectedPairingHandle: (index:number) => void,
    removeFromList: (n:number) => void,
    resetList: () => void,
    closedListMobileHandle: () => void,
}


const dummyUnit ={
    name:'',
    sex:'',
    portrait:'',
    sprite: '',
    classes:[],
    skills:[],
}


const dummyKidData :UnitKidData ={
    name:'',
    sex:'',
    portrait:'',
    sprite: '',
    classes:[],
    skills:[],
    inherited:[ ]
  }
  

type PairingContextProviderProps = { children: ReactNode}

export const PairingContext = createContext({} as PairingContext)

export const PairingContextProvider = ({children}:PairingContextProviderProps) =>{

    const [fatherData, setFatherData] = useState<UnitData>(dummyUnit)
    const [motherData, setMotherData] = useState<UnitData>(dummyUnit)
    const [childOneData, setChildOneData] = useState<UnitKidData>(dummyKidData)
    const [childTwoData, setChildTwoData] = useState<UnitKidData>(dummyKidData)
    const [pairingList, setPairingList] = useState<PairingListType>([])
    const [selectedPairing, setSelectedPairing] = useState<number>(-1)
    const [hitchedList, setHitchedList] = useState<string[]>([])
    const [closedListMobile, setClosedListMobile] = useState(false)
   
    const setParent = (unit:string, sex:string) =>{
        const data:UnitData = {...dummyUnit}
      
        const u = playableUnits.find((chara) => chara.getName() === unit)
        const p = UnitImages[unit] 
        if(u){  
            data.name = u.getName()
            if(u.getSex() === 'm' || u.getSex() === 'am' || u.getSex() === 'lm' || u.getSex() === 'zm'){
                data.sex = 'M'
            }else{
                data.sex = 'F'
              }
        data.portrait = p.portrait 
        data.sprite = p.sprite
        data.classes = u.getClasses() as string[]
        data.skills = u.getSkill()
        }
        
        if(sex === 'm'){
            setFatherData(data)
        }else{
            setMotherData(data)
        }
    }

    useEffect(() =>{

        if(fatherData.name !== '' && motherData.name !== ''){
            getChildData(fatherData.name, motherData.name)
        }
        checkHitched()
    }, [fatherData, motherData])
    

    useEffect(() =>{
       checkHitched()
    },[pairingList])

 const checkHitched = () =>{
    const newHitchedList = []
    for(const p of pairingList){
        const k = Object.keys(p)
        if(k[0] === 'AvatarM'){
            newHitchedList.push('AvatarF')
        }
        if(k[1] === 'AvatarF'){
            newHitchedList.push('AvatarM')
        }
        newHitchedList.push(k[0])
        newHitchedList.push(k[1])
    }
    if(newHitchedList.length > 0){
    setHitchedList(newHitchedList)}
 }


    const getChildData = (dad:string, mom:string) => {

        const compatible = [dad, mom]
        const childless = ['Anna', 'Tiki', "Say'ri", 'Flavia']
        
        if(childless.includes(mom) && dad !== 'AvatarM'){
            resetChildren()
            return
        }
        if(  dad == 'Basilio' && mom !== 'AvatarF'){
            resetChildren()
            return 'No Child'
        }
        
        if(mom === 'Lissa' && dad == 'Chrom'){
            resetChildren()
            return 'Gross Dude'
        }
        
        const noChild = [
            ['Chrom', 'Tharja'], 
            ['Chrom', 'Miriel'], 
            ['Chrom', 'Cordelia'], 
            ['Chrom', 'Panne'], 
            ['Chrom', 'Nowi'], 
            ['Chrom', 'Cherche'], 
            ['AvatarM', 'AvatarF']
        ]
        
       
        for(const pair of noChild) {
            if (pair[0] === compatible[0] && pair[1] === compatible[1]) {
                resetChildren()
                return 'no baby'
            }     }
        

        
        const u:UnitKidData[] = []
        const d = playableUnits.find((chara) => chara.getName() === dad)
        const m = playableUnits.find((chara) => chara.getName() === mom)
        let parentsSkills = [d?.getSkill(), m?.getSkill()]
        if(d && m){
            const ch = baby(m,d)
            for(const child of ch){
                const babyData:UnitKidData = {...dummyKidData};
                const sorted = new Set()
                const extra = new Set()

                for (const [key, value] of child) {
                    babyData[key as string] = value;
                }
                
                babyData.portrait = UnitImages[babyData.name].portrait
                babyData.sprite = UnitImages[babyData.name].sprite
                
                if(babyData.sex === 'cf' ||babyData.sex === 'lf'){
                    babyData.sex = 'F'
                }else if(babyData.sex === 'cm'){
                    babyData.sex = 'M'
                }
                
                if(m.getName() === 'Olivia' && babyData.sex==='F'){
                    const dc = babyData.classes
                    const ds = babyData.skills
                    dc.splice(babyData.classes.indexOf('Dancer'),1)
                    ds.splice(babyData.skills.indexOf('Luck +4'),1)
                    ds.splice(babyData.skills.indexOf('Special Dance'),1)
                    
                    babyData.classes = dc
                    babyData.skills = ds
                    
                }
                
                parentsSkills = parentsSkills.flat().filter(s => s!== undefined)
                
                for (const i of parentsSkills) {
                    if(typeof i === 'string')
                    if(sorted.has(i) || extra.has(i) || babyData.skills.includes(i)){
                        sorted.delete(i)
                        extra.add(i)
                    }else if(!sorted.has(i) ){
                        sorted.add(i)
                    }
                }
                sorted.delete(undefined)
                sorted.delete('none')
                
               
                
                babyData.inherited = Array.from(sorted) as string[]
                

                u.push(babyData)
            }
        }

        setChildOneData(u[0])
        if(u[1]){
            setChildTwoData(u[1])
        }else{
            setChildTwoData(dummyKidData)
        }

    }
    
    const resetChildren = () =>{
        setChildOneData(dummyKidData)
        setChildTwoData(dummyKidData)
    }

    const addPairing = () => {
        if(childOneData.name === '')return
        
        if(childTwoData.name !== ''){
                const pairItem = {[fatherData.name]:{sprite:fatherData.sprite}, [motherData.name]:{sprite:motherData.sprite},  [childOneData.name]:{sprite:childOneData.sprite}, [childTwoData.name]:{sprite:childTwoData.sprite}} 
                setPairingList((prev) =>
                [...prev, pairItem]
                )
            }else{
                const pairItem = {[fatherData.name]:{sprite:fatherData.sprite}, [motherData.name]:{sprite:motherData.sprite},  [childOneData.name]:{sprite:childOneData.sprite}} 
                setPairingList((prev) =>
                [...prev, pairItem]
                )
            }

            for(const p of pairingList){
                const kiddo = Object.keys(p)
                
                const pairItem = {[fatherData.name]:{sprite:fatherData.sprite}, [motherData.name]:{sprite:motherData.sprite},  [childOneData.name]:{sprite:childOneData.sprite}} 
                if(kiddo.indexOf(childOneData.name) == 2 || kiddo.indexOf(childTwoData.name) == 3){
                    const newPairingList = [...pairingList]
                        newPairingList.splice(pairingList.indexOf(p),1)
                        setPairingList([...newPairingList, pairItem])
                    }
                }



            setFatherData(dummyUnit)
            setMotherData(dummyUnit)
            setChildOneData(dummyKidData)
            setChildTwoData(dummyKidData)
            resetChildren()
        }


    
    
    const returnToDisplay = () => {
        if(pairingList.length === 0) return
        const keys = Object.keys(pairingList[selectedPairing])
        const d = keys[0]
        const m = keys[1]
        setParent(d, 'm')
        setParent(m, 'f')
    }
    
    const selectedPairingHandle = (index:number) => {
        
        setSelectedPairing(index)
    }
    
    const removeFromList = (n:number) => {
        const newPairingList = [...pairingList]
    
        newPairingList.splice(n, 1)
        setPairingList(newPairingList)
        setSelectedPairing(-1)
        if(newPairingList.length === 0){
            setHitchedList([])
        }
    }

    const resetList = () => {
        setPairingList([])
        setHitchedList([])
        setFatherData(dummyUnit)
        setMotherData(dummyUnit)
        setChildOneData(dummyKidData)
        setChildTwoData(dummyKidData)
    }

    const closedListMobileHandle = () => {
        setClosedListMobile(!closedListMobile)
    }
 
 

const pairingValues = {    fatherData, motherData, childOneData, childTwoData,
    pairingList, selectedPairing, hitchedList,closedListMobile, setParent, addPairing, returnToDisplay,
     selectedPairingHandle, removeFromList, resetList, closedListMobileHandle}

    return (
        <PairingContext.Provider value={pairingValues}>
            {children}
        </PairingContext.Provider>
    )
}