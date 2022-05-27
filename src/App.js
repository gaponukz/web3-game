import { useEffect, useState } from 'react'
import { CONTACT_ABI, CONTACT_ADDRESS } from './config'
import Web3 from 'web3'

const App = () => {
	const [account, setAccount] = useState()
	const [roomUsersCount, setRoomUsersCount] = useState()

	const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
	const game = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS)

	useEffect(() => {
		(async () => {
			const accounts = await web3.eth.requestAccounts()
			setRoomUsersCount(await game.methods.roomUsersCount().call())
			setAccount(accounts[0])
		})()
	}, []);
	
	return (
		<div>
       		Your account is: {account}, rooms count: {roomUsersCount}

			<button onClick={async () => {
				game.methods.addUserToGame().send({
					from: account,
					gas: 3200000,
					value: web3.utils.toWei("0.025", "ether")
				}, (error, result) => {
					if (error) {
						alert("You are not in game")
					}
				})
			}}>Add me to game</button>
     	</div>
	);
}

export default App
