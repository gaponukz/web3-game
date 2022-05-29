import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const GameNavbar = props => {
    const ethereumIcon = "https://ethereum.org/static/a110735dade3f354a46fc2446cd52476/f3a29/eth-home-icon.webp"
    const getShortAddresses = (address) => {
        return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : address
    }

    return (
        <Navbar bg="light" style={{"marginBottom": "25px"}}>
            <Container>
                <img
                    src={ethereumIcon}
                    width="22"
                    height="35"
                    style={{marginRight: '15px'}}
                    className="d-inline-block align-top"
                />
                <Navbar.Brand href="#">Web3 casino game</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href={`https://etherscan.io/address/${props.address}`}> {getShortAddresses(props.address)} </a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default GameNavbar