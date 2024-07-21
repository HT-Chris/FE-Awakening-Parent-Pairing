import { useContext} from "react"
import { PairingContext } from "./PairingContext"
import { Pairings } from "./Pairings"
import  logo  from '../assets/fe_child/title/Fire_Emblem_Awakening_logo.webp' 



export const SavedPairings = () => {

	const {addPairing, returnToDisplay, resetList,
		pairingList, closedListMobile, closedListMobileHandle} = useContext(PairingContext)


	return (
		<>

        <div id="saved-pairings-mobile" className={`${closedListMobile ? '' : 'hide'}`}>
		
			<img src={logo} id='logo' alt="Fire Emblem Awakening Logo" />

			<div id="btns-container">
				<button className={`btn btn-green ${closedListMobile ? 'hide' : ''}`} onClick={()=>addPairing()}>Add Pair</button>
				<button className="btn btn-blue" onClick={()=>returnToDisplay()}>Re-display</button>
				<button className="btn btn-red" onClick={()=>resetList()}>Rest Pairings</button>
				<button className="btn btn-close-fe13" onClick={closedListMobileHandle}>Close List</button>
			</div>
			{pairingList.map((p, index) =>(
				<span key={index}>
				<Pairings keyIndex={index} data={p}/>
				</span>
			))}

        </div>

        <div id="saved-pairings" >
		
			<img src={logo} id='logo' alt="Fire Emblem Awakening Logo" />

			<div id="btns-container">
				<button className={`btn btn-green ${closedListMobile ? 'hide' : ''}`} onClick={()=>addPairing()}>Add Pair</button>
				<button className="btn btn-blue" onClick={()=>returnToDisplay()}>Re-display</button>
				<button className="btn btn-red" onClick={()=>resetList()}>Rest Pairings</button>
			</div>
			{pairingList.map((p, index) =>(
				<span key={index}>
				<Pairings keyIndex={index} data={p}/>
				</span>
			))}

        </div>

		</>
	)
}