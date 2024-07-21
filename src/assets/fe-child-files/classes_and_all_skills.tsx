//PROMOTED

type allClassesProps = {
    [key:string]: BASE_CLASS[]
}

type ChildMap = {
        [key: string]: _CHILD_CLASSES;
      };
    
    
    type genderClassesProps = {
        [key:string]:  BASE_CLASS[]
    }
export let genderClasses : genderClassesProps ={}
export let allClasses : allClassesProps = {}
export let parentNchild : ChildMap ={}

class CLASS_PROMOTED {
    private className: string;
    private earlySkill: string;
    private lateSkill: string;
    private preClass1: string;
    private preClass2: string;

    constructor(name:string, earlySkill:string, lateSkill:string, base:string, base2 = 'none') {
        this.className = name,
            this.earlySkill = earlySkill,
            this.lateSkill = lateSkill,
            this.preClass1 = base
        this.preClass2 = base2
    }

    getPrivate(){
        return [this.className, this.earlySkill, this.lateSkill, this.preClass1, this.preClass2]
    }


    getSkills() {
        const values = Object.values(this)
        return values.slice(1)
    }

    getPreClass() {
        return this.preClass1
    }


}

//BASE

class BASE_CLASS {
    private className: string;
    private earlySkill: string;
    private lateSkill: string;
    private promotion_one: CLASS_PROMOTED|string;
    private promotion_two: CLASS_PROMOTED|string;

    constructor(name:string, earlySkill:string, lateSkill:string, promotion_one:CLASS_PROMOTED|'none', promotion_two:CLASS_PROMOTED|'none') {
        this.className = name,
            this.earlySkill = earlySkill,
            this.lateSkill = lateSkill,
            this.promotion_one = promotion_one,
            this.promotion_two = promotion_two
    }

    getPrivate(){
        return [this.className, this.earlySkill, this.lateSkill, this.promotion_one, this.promotion_two]
    }

    getAllClasses() {
        const values = Object.values(this)
        const base = values[0]
        const promoteOne = values[3].className 
        const promoteTwo = values[4].className 
        return [base, promoteOne, promoteTwo]
    }

    getAllSkills() {
        const values = Object.values(this)
        const baseSkills = [values[1], values[2]]
        const promoteOneSkills = [values[3]?.earlySkill, values[3]?.lateSkill] 
        const promoteTwoSkills = [values[4]?.earlySkill, values[4]?.lateSkill] 
        return [baseSkills, promoteOneSkills, promoteTwoSkills].flat() || 'none'

    }

}

class _CHAR_CLASSES {
    private name: string;
    private sex: string;
    private start: BASE_CLASS;
    private reClassOne: BASE_CLASS;
    private reClassTwo: BASE_CLASS;
    private reClassThree?:BASE_CLASS;
 
    constructor(name:string, sex:string, start:BASE_CLASS, reClassOne:BASE_CLASS, reClassTwo:BASE_CLASS) {
        this.name = name
        this.sex = sex
        this.start = start
        this.reClassOne = reClassOne
        this.reClassTwo = reClassTwo
    }

    
    getName(){
        return this.name
    }

    getSex(){
        return this.sex
    }

    getClasses() {
        const first = this.start
        const second = this.reClassOne
        const third = this.reClassTwo
        const fourth = this.reClassThree
        const classes = [first.getAllClasses(), second.getAllClasses(), third.getAllClasses()]
        if(fourth){
            classes.push( fourth.getAllClasses())
            
        }
        
        return doubles(classes.flat())
    }
    
    
    getSkill() {
        const first = this.start
        const second = this.reClassOne
        const third = this.reClassTwo
        const fourth = this.reClassThree
        const skill =  [first.getAllSkills(), second.getAllSkills(), third.getAllSkills()]
        if(fourth){
            skill.push( fourth.getAllSkills())
        }
        return skill.flat()
    }
}

class avatar {
    private name: string;
    private sex: string;
    private start: BASE_CLASS;
    private classes: BASE_CLASS[];
    private genderClasses: BASE_CLASS[];

    constructor(name:string, sex:string, start:BASE_CLASS, gender:BASE_CLASS[]) {
        this.name = name
        this.sex = sex
        this.start = start
        this.classes = allClasses.base
        this.genderClasses = gender
    }

    getStart(){
        return this.start
    }

    getName(){
        return this.name
    }
    
    getSex(){
        return this.sex
    }

    getClasses() {
        const classesGender = [...this.classes, ...this.genderClasses]
        const list = []
        for (const c of classesGender) {
            list.push(c.getAllClasses())
        }
        return doubles(list.flat())

    }

    getSkill() {
        const cla = [...this.classes, ...this.genderClasses]
        const list = []
        for (const c of cla) {
            if (c instanceof BASE_CLASS) {
                list.push(c.getAllSkills())
            }
        }

        return doubles(list.flat())
    }

}

class _CHILD_CLASSES {
    private name: string;
    private sex: string;
    private start: BASE_CLASS;
    private reClassOne: BASE_CLASS;
    private reClassTwo: BASE_CLASS;
    private reClassThree?: BASE_CLASS;

    constructor(name:string, sex:string, start:BASE_CLASS, reClassOne:BASE_CLASS, reClassTwo:BASE_CLASS, reClassThree?:BASE_CLASS) {
        this.name = name
        this.sex = sex
        this.start = start
        this.reClassOne = reClassOne
        this.reClassTwo = reClassTwo
        this.reClassThree = reClassThree
    }

    getName(){
        return this.name
    }

    getSex(){
        return this.sex
    }

    getClasses() {
        const first = this.start
        const second = this.reClassOne
        const third = this.reClassTwo
        const fourth = this.reClassThree
        const classes = [first.getAllClasses(), second.getAllClasses(), third.getAllClasses()]
        if(fourth){
        classes.push(fourth.getAllClasses())
        }
        
        return doubles(classes.flat())
    }

    getSkill() {
        const first = this.start
        const second = this.reClassOne
        const third = this.reClassTwo
        const fourth = this.reClassThree
        const skill = [first.getAllSkills(), second.getAllSkills(), third.getAllSkills()]
        if(fourth){
        skill.push(fourth.getAllSkills())
        }
        return doubles(skill.flat())
    }
}

//function to check who has a class or skill


export const doubles = function(arr:string[]| string) {

    if(typeof arr === "string"){
        arr = [arr]
    }
    const sorted = new Set()

    for (const i of arr) {
        sorted.add(i)
    }
    sorted.delete(undefined)
    sorted.delete('none')
    return Array.from(sorted)
}


const condense = function(x:string[] | string | undefined, y:string[] | string| undefined) {

    if(typeof x === 'string'){
        x = [x]
    }

    if(typeof y === 'string'){
        y = [y]
    }

    const arr = [x].concat(y)
    const sorted = new Set()

    for (const i of arr) {
        sorted.add(i)
    }
    sorted.delete(undefined)
    sorted.delete('none')
    return Array.from(sorted)
}


export const baby = function(parentOne:_CHAR_CLASSES| avatar| _CHILD_CLASSES, parentTwo:_CHAR_CLASSES| avatar| _CHILD_CLASSES) {




    // see if parents are opposite sex
    let reproductive = parentOne.getSex() + parentTwo.getSex()
    reproductive = reproductive.split('').sort().join('') 

    if (!parentTable.includes(reproductive)) {
        return false + ' no baby'
    }

    // figure out who is father and mother
    let daddy 
    let mommy 
    if (parentOne.getSex() === 'm' || parentOne.getSex() === 'lm' || parentOne.getSex() === 'am') {
        daddy = parentOne
        mommy = parentTwo
    } else {
        mommy = parentOne
        daddy = parentTwo
    }

    
    if (mommy.getName() === 'Lissa' && daddy.getName() === 'Chrom') {
        return false + 'gross dude'
    }
    if ((mommy.getName() === 'Panne' || mommy.getName() === 'Nowi') && daddy.getName() === 'Chrom') {
        return false + 'furry lover chrom'
    }

    const child1: Map<string, string | string[]> = new Map()
    const child2: Map<string, string | string[]> = new Map()
    const child3: Map<string, string | string[]> = new Map()
    const children =[]

    const genderParents = Object.keys(genderClasses)

    const key = Object.keys(parentNchild)
    const values = Object.values(parentNchild)



 

  if(mommy.getSex() == 'af' || daddy.getSex() == 'am'){
      if (mommy.getSex() == 'af') {
          child3.set('name', 'Morgan(boy)')
            .set('sex', 'M')
            .set('classes',[ ...avatarM_CHAR_CLASSES.getClasses()] as string[])
            .set('skills', [...avatarM_CHAR_CLASSES.getSkill()] as string[])

            if(daddy.getName() !== 'Chrom'){
                return [child3]
            }

        } else if (daddy.getSex() == 'am') { 
        
            child3.set('name', 'Morgan(girl)')
                .set('sex', 'F') 
                .set('classes', [...avatarF_CHAR_CLASSES.getClasses()] as string[])
                .set('skills', [...avatarF_CHAR_CLASSES.getSkill()] as string[])
    }

    if(mommy.getName() === 'Nowi'){
        const jobs = child3.get('classes')
        if(  Array.isArray(jobs))
        jobs.push("Manakete")
    if(jobs){
        child3.set('classes', jobs)}
    }
    if(mommy.getName() === 'Panne'){
        const jobs = child3.get('classes')
        if(  Array.isArray(jobs))
        jobs.push("Taguel")
    if(jobs){
        child3.set('classes', jobs)}
    }

    if(mommy.getSex() == 'zf' && daddy.getSex()==='am'){
        return [child3]
    }

        if(daddy.getName() === 'Chrom'){
            const c = child3.get('classes')?.concat(...lord.getAllClasses())
            const s = child3.get('skills')?.concat(...chrom_CHAR_CLASSES.getSkill())
            const cl = [...avatarF_CHAR_CLASSES.getClasses(), ...lord.getAllClasses()]
            const sl = [...avatarF_CHAR_CLASSES.getSkill(), ...chrom_CHAR_CLASSES.getSkill()]
            if(c && s && cl){
           
            child3.set('classes',doubles(c) as string[])
                .set('skills', doubles(s)as string[])
            child2.set('name', 'Lucina')
                .set('classes',doubles(cl) as string[])
                .set('skills', doubles(sl) as string[])
                .set('sex', 'cf')
            }
            
           return [child2, child3]
        }
            children.push(child3)

    }
    
    //case for lucina
    
    if(daddy.getName() === 'Chrom'){
        child2.set('name', 'Lucina')
        .set('sex', 'cf')
        .set('classes', [...lucina_CHILD_CLASSES.getClasses(), ...mommy.getClasses()] as string[])
        .set('skills', [...lucina_CHILD_CLASSES.getSkill(), ...mommy.getSkill()])
        children.push(child2)
    }
    
    // finding the child(s) and getting the classes and skills together

    const kid = parentNchild[mommy.getName()]
    let dadPassingClasses, dadPassingSkills
    
            if( genderParents.indexOf(daddy.getName()) >= 0 && kid.getSex() === 'cf' ){
                const j = genderClasses[daddy.getName() as string]
                const c:string[]=[], s=[] 
                for(const i of j){
                    c.push(...i.getAllClasses())
                    s.push(...i.getAllSkills())
                }

                 dadPassingClasses = doubles(c)
                 dadPassingSkills = doubles(s)
                }else if(kid.getSex() === 'cf' && daddy.getSex() === 'am'){
                    dadPassingClasses=avatarF_CHAR_CLASSES.getClasses()
                    dadPassingSkills=avatarF_CHAR_CLASSES.getSkill()

                }   else{
                    dadPassingClasses=daddy.getClasses()
                    dadPassingSkills=daddy.getSkill()
            }

    child1.set('name', kid.getName())
        .set('sex', kid.getSex())
        .set('classes', doubles([...kid.getClasses(), ...dadPassingClasses] as string[])  as string[])
        .set('skills', doubles([...values[key.indexOf(mommy.getName())].getSkill(), ...dadPassingSkills]) as string[])

        if(mommy.getSex() === 'af' || daddy.getSex() ==='am'){
            if(child1.get('sex') === 'cf'){
                child1.set('classes', [...avatarF_CHAR_CLASSES.getClasses()] as string[])
            }
            if(child1.get('sex') === 'cm'){
                child1.set('classes', [...avatarM_CHAR_CLASSES.getClasses()] as string[])
            }

            if(mommy.getName() === 'Nowi'){
                const jobs = child1.get('classes')
                if(  Array.isArray(jobs))
                jobs.push("Manakete")
            if(jobs){
                child1.set('classes', jobs)}
            }
            if(mommy.getName() === 'Panne'){
                const jobs = child1.get('classes')
                if(  Array.isArray(jobs))
                jobs.push("Taguel")
            if(jobs){
                child1.set('classes', jobs)}
            }
        

        }

    if(child1.size !== 0){
        children.push( child1)
    }

       return children
    }

    






//PROMOTED CLASS VARIABLES
const paladin = new CLASS_PROMOTED('Paladin', 'Defender', 'Aegis', 'Cavalier')
const greatKnight = new CLASS_PROMOTED('Great Knight', 'Luna', 'Dual Guard+', 'Cavalier', 'Knight')
const swordMaster = new CLASS_PROMOTED('Swordmaster', 'Astra', 'Swordfaire', 'Myrmidon')
const assassin = new CLASS_PROMOTED('Assassin', 'Lethality', 'Pass', 'Myrmidon')
const wyvernlord = new CLASS_PROMOTED('Wyvern Lord', 'Quick Burn', 'Swordbreaker', 'Wyvern Rider')
const griffinKnight = new CLASS_PROMOTED('Griffin Knight', 'Deliverer', 'Lancebreaker', 'Wyvern Rider')
const general = new CLASS_PROMOTED('General', 'Rally Defense', 'Pavise', 'Knight')
const berserker = new CLASS_PROMOTED('Berserker', 'Wrath', 'Axefaire', 'barbarian')
const warrior = new CLASS_PROMOTED('Warrior', 'Rally Strength', 'Counter', 'Barbarian', 'Fighter')
const hero = new CLASS_PROMOTED('Hero', 'Sol', 'Axebreaker', 'Fighter', 'Mercenary')
const bowKnight = new CLASS_PROMOTED('Bowknight', 'Rally Skill', 'Bowbreaker', 'Mercenary', 'Archer')
const sniper = new CLASS_PROMOTED('Sniper', 'Hit Rate +20', 'Bowfaire', 'Archer')
const trickster = new CLASS_PROMOTED('Trickster', 'Lucky Seven', 'Acrobat', 'Thief')
const sorcerer = new CLASS_PROMOTED('Sorcerer', 'Vengeance', 'Tomebreaker', 'Dark Mage')
const darkKnight = new CLASS_PROMOTED('Dark Knight', 'Slow Burn', 'Lifetaker', 'Dark Mage', 'Mage')
const sage = new CLASS_PROMOTED('Sage', 'Rally Magic', 'Tomefaire', 'Mage', 'Priest/Cleric')
const warMonk = new CLASS_PROMOTED('War Monk', 'Rally Luck', 'Renewal', 'Priest')
const warCleric = new CLASS_PROMOTED('War Cleric', 'Rally Luck', 'Renewal', 'Cleric')
const valkyrie = new CLASS_PROMOTED('Valkyrie', 'Rally Resistance', 'Dual Support+', 'Troubadour')
const darkFlier = new CLASS_PROMOTED('Dark Flier', 'Rally Movement', 'Galeforce', 'Pegasus Knight')
const falconKnight = new CLASS_PROMOTED('Falcon Knight', 'Rally Speed', 'Lancefaire', 'Pegasus Knight')
const griffonRider = new CLASS_PROMOTED('Griffon Rider', 'Deliverer', 'Lancebreaker', 'Wyvern Rider')
const grandmaster = new CLASS_PROMOTED('Grandmaster', 'Ignis', 'Rally Spectrum', 'Tactician')
const greatLord = new CLASS_PROMOTED('Great Lord', 'Aether', 'Rightful King', 'Lord')


//BASE CLASSES

const cavalier = new BASE_CLASS('Cavalier', 'Discipline', 'Outdoor Fighter', paladin, greatKnight)
const myrmidon = new BASE_CLASS('Myrmidon', 'Avoid +10', 'Vantage', assassin, swordMaster)
const wyvernRider = new BASE_CLASS('Wyvern Rider', 'Strength+2', 'Tantivy', wyvernlord, griffinKnight)
const knight = new BASE_CLASS('Knight', 'Defense +2', 'Indoor Fighter', greatKnight, general)
const barbarian = new BASE_CLASS('Barbarian', 'Despoil', 'Gamble', berserker, warrior)
const fighter = new BASE_CLASS('Fighter', 'Max HP +5', 'Zeal', warrior, hero)
const mercenary = new BASE_CLASS('Mercenary', 'Armsthrift', 'Patience', hero, bowKnight)
const archer = new BASE_CLASS('Archer', 'Skill +2', 'Prescience', bowKnight, sniper)
const thief = new BASE_CLASS('Thief', 'Locketouch', 'Movement +1', trickster, assassin)
const darkMage = new BASE_CLASS('Dark Mage', 'Hex', 'Anathema', sorcerer, darkKnight)
const mage = new BASE_CLASS('Mage', 'Magic +2', 'Concentration', darkKnight, sage)
const priest = new BASE_CLASS('Priest', 'Miracle', 'Healtouch', warMonk, 'none')
const cleric = new BASE_CLASS('Cleric', 'Miracle', 'Healtouch', warCleric, 'none')
const troubadour = new BASE_CLASS('Troubadour', 'Resistance +2', 'Demoiselle', warCleric, valkyrie)
const pegasusKnight = new BASE_CLASS('Pegasus Knight', 'Speed +2', 'Relief', darkFlier, falconKnight)
const tactician = new BASE_CLASS('Tactician', 'Veteran', 'Solidarity', grandmaster, 'none')
const lord = new BASE_CLASS('Lord', 'Dual Strike+', 'Charm', greatLord, 'none')

const villager = new BASE_CLASS('Villager', 'Aptitude', 'UnderDog', 'none', 'none')
const taguel = new BASE_CLASS('Taguel', 'Even Rhythm', 'Beastbane', 'none', 'none')
const manakete = new BASE_CLASS('Manakete', "Odd Rhythm", 'Wyvermsbane', 'none', 'none')
const dancer = new BASE_CLASS('Dancer', 'Luck +4', 'Special Dance', 'none', 'none')

allClasses = {
    base: [cavalier, myrmidon, wyvernRider, knight, mercenary, archer, thief,
        darkMage, mage, tactician
    ],
    af: [pegasusKnight, troubadour, cleric],
    am: [barbarian, fighter, priest]
}

//CHARACTER CLASS OPTIONS


const avatarM_CHAR_CLASSES = new avatar('AvatarM', 'am', tactician, allClasses.am)
const avatarF_CHAR_CLASSES = new avatar('AvatarF', 'af', tactician, allClasses.af)



const chrom_CHAR_CLASSES = new _CHAR_CLASSES('Chrom', 'lm', lord, cavalier, archer)
const lissa_CHAR_CLASSES = new _CHAR_CLASSES('Lissa', 'f', cleric, pegasusKnight, troubadour)
const frederick_CHAR_CLASSES = new _CHAR_CLASSES('Frederick', 'm', cavalier, knight, wyvernRider)
const sully_CHAR_CLASSES = new _CHAR_CLASSES('Sully', 'f', cavalier, myrmidon, wyvernRider)
const virion_CHAR_CLASSES = new _CHAR_CLASSES('Virion', 'm', archer, wyvernRider, mage)
const stahl_CHAR_CLASSES = new _CHAR_CLASSES('Stahl', 'm', cavalier, archer, myrmidon)
const vaike_CHAR_CLASSES = new _CHAR_CLASSES('Vaike', 'm', fighter, thief, barbarian)
const miriel_CHAR_CLASSES = new _CHAR_CLASSES('Miriel', 'f', mage, troubadour, darkMage)
const sumia_CHAR_CLASSES = new _CHAR_CLASSES('Sumia', 'f', pegasusKnight, knight, cleric)
const kellam_CHAR_CLASSES = new _CHAR_CLASSES('Kellam', 'm', knight, thief, priest)
const donnel_CHAR_CLASSES = new _CHAR_CLASSES('Donnel', 'm', villager, fighter, mercenary)
const lonqu_CHAR_CLASSES = new _CHAR_CLASSES("Lon'qu", 'm', myrmidon, thief, wyvernRider)
const ricken_CHAR_CLASSES = new _CHAR_CLASSES('Ricken', 'm', mage, cavalier, archer)
const maribelle_CHAR_CLASSES = new _CHAR_CLASSES('Maribelle', 'f', troubadour, pegasusKnight, mage)
const panne_CHAR_CLASSES = new _CHAR_CLASSES('Panne', 'f', taguel, thief, wyvernRider)
const gaius_CHAR_CLASSES = new _CHAR_CLASSES('Gaius', 'm', thief, fighter, myrmidon)
const cordelia_CHAR_CLASSES = new _CHAR_CLASSES('Cordelia', 'f', pegasusKnight, mercenary, darkMage)
const gregor_CHAR_CLASSES = new _CHAR_CLASSES('Gregor', 'm', mercenary, barbarian, myrmidon)
const nowi_CHAR_CLASSES = new _CHAR_CLASSES('Nowi', 'f', manakete, mage, wyvernRider)
const libra_CHAR_CLASSES = new _CHAR_CLASSES('Libra', 'm', priest, mage, darkMage)
const tharja_CHAR_CLASSES = new _CHAR_CLASSES('Tharja', 'f', darkMage, knight, archer)
const olivia_CHAR_CLASSES = new _CHAR_CLASSES('Olivia', 'f', dancer, myrmidon, pegasusKnight)
const cherche_CHAR_CLASSES = new _CHAR_CLASSES('Cherche', 'f', wyvernRider, troubadour, cleric)
const henry_CHAR_CLASSES = new _CHAR_CLASSES('Henry', 'm', darkMage, barbarian, thief)

// AVATAR ONLY ROMANCE

const anna_CHAR_CLASSES = new _CHAR_CLASSES('Anna', 'zf', thief, archer, mage)
const sayri_CHAR_CLASSES = new _CHAR_CLASSES('Say\'ri', 'zf', myrmidon, pegasusKnight, wyvernRider)
const tiki_CHAR_CLASSES = new _CHAR_CLASSES('Tiki', 'zf', manakete, wyvernRider, mage)
const basilio_CHAR_CLASSES = new _CHAR_CLASSES('Basilio', 'zm', fighter, barbarian, mage)
const flavia_CHAR_CLASSES = new _CHAR_CLASSES('Flavia', 'zf', mercenary, thief, knight)

export const extras = [ condense]

//CHILDREN

const lucina_CHILD_CLASSES = new _CHILD_CLASSES('Lucina', 'cf', lord, cavalier, archer)
const owain_CHILD_CLASSES = new _CHILD_CLASSES('Owain', 'cm', myrmidon, priest, barbarian)
const indigo_CHILD_CLASSES = new _CHILD_CLASSES('Indigo', 'cm', mercenary, myrmidon, barbarian)
const brady_CHILD_CLASSES = new _CHILD_CLASSES('Brady', 'cm', priest, cavalier, mage)
const kjelle_CHILD_CLASSES = new _CHILD_CLASSES('Kjelle', 'cf', knight, myrmidon, cavalier, wyvernRider)
const cynthia_CHILD_CLASSES = new _CHILD_CLASSES('Cynthia', 'cf', pegasusKnight, knight, cleric)
const severa_CHILD_CLASSES = new _CHILD_CLASSES('Severa', 'cf', mercenary, pegasusKnight, darkMage)
const gerome_CHILD_CLASSES = new _CHILD_CLASSES('Gerome', 'cm', wyvernRider, fighter, priest)
const yarne_CHILD_CLASSES = new _CHILD_CLASSES('Yarne', 'cm', taguel, thief, barbarian)
const laurent_CHILD_CLASSES = new _CHILD_CLASSES('Laurent', 'cm', mage, barbarian, darkMage)
const noire_CHILD_CLASSES = new _CHILD_CLASSES('Noire', 'cf', archer, knight, darkMage)
const nah_CHILD_CLASSES = new _CHILD_CLASSES('Nah', 'cf', manakete, wyvernRider, mage)




export const playableUnits = [ avatarM_CHAR_CLASSES, avatarF_CHAR_CLASSES,
    chrom_CHAR_CLASSES, lissa_CHAR_CLASSES, frederick_CHAR_CLASSES, sully_CHAR_CLASSES,
    virion_CHAR_CLASSES, stahl_CHAR_CLASSES, vaike_CHAR_CLASSES, miriel_CHAR_CLASSES, sumia_CHAR_CLASSES,
    kellam_CHAR_CLASSES, donnel_CHAR_CLASSES, lonqu_CHAR_CLASSES, ricken_CHAR_CLASSES,
    maribelle_CHAR_CLASSES, panne_CHAR_CLASSES, gaius_CHAR_CLASSES, cordelia_CHAR_CLASSES,
    gregor_CHAR_CLASSES, nowi_CHAR_CLASSES, libra_CHAR_CLASSES, tharja_CHAR_CLASSES,
    olivia_CHAR_CLASSES, cherche_CHAR_CLASSES, henry_CHAR_CLASSES, anna_CHAR_CLASSES, sayri_CHAR_CLASSES,tiki_CHAR_CLASSES, basilio_CHAR_CLASSES,
    flavia_CHAR_CLASSES
]

export const childUnits ={
    lucina_CHILD_CLASSES, owain_CHILD_CLASSES, indigo_CHILD_CLASSES, brady_CHILD_CLASSES, 
    kjelle_CHILD_CLASSES, cynthia_CHILD_CLASSES, severa_CHILD_CLASSES, gerome_CHILD_CLASSES,
    yarne_CHILD_CLASSES, laurent_CHILD_CLASSES, noire_CHILD_CLASSES, nah_CHILD_CLASSES
}

export const classUnits = [
    cavalier, myrmidon, wyvernRider, knight, barbarian, fighter, mercenary, archer, thief, darkMage, mage,
    priest, cleric, troubadour, pegasusKnight, tactician, lord, villager, taguel, manakete, dancer,
    paladin, greatKnight, swordMaster, assassin, wyvernlord, griffinKnight, general, berserker,
    warrior, hero, bowKnight, sniper, trickster, sorcerer, darkKnight, sage, warMonk, warCleric, valkyrie,
    darkFlier, falconKnight, griffonRider, grandmaster, greatLord
]


parentNchild = {
    'Chrom': lucina_CHILD_CLASSES,
    'Lissa': owain_CHILD_CLASSES,
    'Olivia': indigo_CHILD_CLASSES,
    'Maribelle': brady_CHILD_CLASSES,
    'Sully': kjelle_CHILD_CLASSES,
    'Sumia': cynthia_CHILD_CLASSES,
    'Cordelia': severa_CHILD_CLASSES,
    'Cherche': gerome_CHILD_CLASSES,
    'Panne': yarne_CHILD_CLASSES,
    'Miriel': laurent_CHILD_CLASSES,
    'Tharja': noire_CHILD_CLASSES,
    'Nowi': nah_CHILD_CLASSES,
   
}

 genderClasses ={
    'Lissa' : [ myrmidon, barbarian, priest],
    'Miriel': [barbarian, mage, darkMage],
    'Maribelle' : [cavalier, priest, mage],
    'Panne': [barbarian],
    'Cherche':[fighter, wyvernRider, priest],
    'Olivia':[mercenary, barbarian, myrmidon],


    'Vaike': [knight, mercenary, thief],
    'Gaius':[pegasusKnight, thief, myrmidon],
    'Donnel':[pegasusKnight, troubadour, mercenary],
    'Gregor':[troubadour, mercenary, myrmidon],
    'Henry':[troubadour, thief, darkMage]
}


const classConvert = new Map
classConvert.set('Lissa', [
        [pegasusKnight, troubadour],
        [myrmidon, barbarian]
    ])
    .set('Miriel', [
        [troubadour],
        [barbarian]
    ])
    .set('Maribelle', [
        [pegasusKnight, troubadour],
        [cavalier, priest]
    ])
    .set('Panne', [
        [wyvernRider],
        [barbarian]
    ])
    .set('Cherche', [
        [troubadour, cleric],
        [fighter, priest]
    ])
    .set('Olivia', [
        [pegasusKnight, dancer],
        [mercenary, barbarian]
    ])
    .set('Vaike', [
        [fighter, barbarian],
        [knight, mercenary]
    ])
    .set('Gaius', [
        [fighter],
        [pegasusKnight]
    ])
    .set('Donnel', [
        [fighter, villager],
        [pegasusKnight, troubadour]
    ])
    .set('Gregor', [
        [barbarian],
        [troubadour]
    ])
    .set('Henry', [
        [barbarian],
        [troubadour]
    ])




const parentTable = [
    'fm', 'afm', 'acfm', 'flm', 'aflm', 'afmz'
]

export const nonCompatibleCouple = [
    ['Chrom', 'Lissa', "Ewwww, gross that's your sister!"],
    ['Chrom', 'Panne', "No Chemistry"],
    ['AvatarM', 'AvatarF', 'Umm, i know they say to love yourself but ...'],
    [ 'not avatarM','Anna', "I ain't saying she's a gold digger"],
    [ 'not avatarM',"Say'ri", "No Chemistry"],
    [ 'not avatarM','Tiki', 'No Chemistry' ],
    [ 'not avatarM','Flavia',  "No Chemistry"]
]


