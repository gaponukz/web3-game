import { useEffect, useState } from 'react'
import { CONTACT_ABI, CONTACT_ADDRESS } from './config'
import Web3 from 'web3'

import GameNavbar from './components/GameNavbar'
import GameBox from './components/GameBox'
import GameContainer from './components/GameContainer'

const App = () => {
	const [account, setAccount] = useState()
	const [roomAddresses, setRoomAddresses] = useState([])
	const [roomUsersCount, setRoomUsersCount] = useState()
	const [personCounter, setPersonCounter] = useState()

	const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
	const game = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS)

	const joinUserToGame = async () => {
		game.methods.startingPlay().send({
			from: account,
			gas: 3200000,
			value: web3.utils.toWei("0.025", "ether")
		}, (error, result) => {
			setTimeout(() => window.location.reload(), 500)
		})
	}

	useEffect(() => {
		(async () => {
			game.events.GameOver({}).on('data', event => alert(`Won ${event.returnValues.winner}`))
			
			const accounts = await web3.eth.requestAccounts()
			const currentRoomId = await game.methods.currentRoomId().call()
			const personCounter = await game.methods.personCounter().call()
			const roomUsersCount = await game.methods.roomUsersCount().call()

			let roomAddresses = []

			for (let roomAddresseId = 0; roomAddresseId < personCounter; roomAddresseId++) {
				roomAddresses.push(await game.methods.roomAddresses(currentRoomId, roomAddresseId).call())
			}

			setRoomUsersCount(roomUsersCount)
			setPersonCounter(personCounter)
			setRoomAddresses(roomAddresses)
			setAccount(accounts[0])
		})()
	}, [])
	
	return (
		<div>
			<GameNavbar address={account}/>
			<GameContainer>
				<GameBox
					addresses={roomAddresses}
					personCounter={personCounter}
					roomUsersCount={roomUsersCount}
					joinUserToGame={joinUserToGame}
				/>
			</GameContainer>
     	</div>
	)
}

export default App
