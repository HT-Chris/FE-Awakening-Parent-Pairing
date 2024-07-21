import {useContext} from 'react'
import { PairingContext,PairingProps } from "./PairingContext"


export const Pairings:React.FC<PairingProps> = ({data, keyIndex}) =>{

const {removeFromList, selectedPairing, selectedPairingHandle} = useContext(PairingContext)

const isSelected = keyIndex == selectedPairing


	return (

		<>
		
		<div className={`pairings  ${isSelected ? 'red-border' : 'p-hover'}`} >

			<span className='pairings' onClick={()=>selectedPairingHandle(keyIndex)}>
				{Object.keys(data).map((chara, index) =>(
					<span key={index}  >
					<div className="sprite-container"  >
						<img src={data[chara].sprite} alt="" />
					<div className="details">
					<p>{chara}</p>
					</div>
					</div>
					</span>
				))}
			</span>
				
			<button className='btn-red' onClick={() =>removeFromList(keyIndex)}>&#215;</button>
		</div>
		</>
	)
}