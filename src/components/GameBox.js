import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const GameBox = props => {
    const buttonStyle = {
        position: 'absolute',
        right: '20px',
        top: '4px'
    }
    return (
        <Card>
            <Card.Header>
                Already in game addresses list ({props.personCounter}/{props.roomUsersCount})

                <Button style={buttonStyle} variant="outline-secondary" size="sm" onClick={props.joinUserToGame}>Join game!</Button>
            </Card.Header>
            <ListGroup variant="flush">
                {props.addresses.map(address => 
                    <ListGroup.Item> {address} </ListGroup.Item>
                )}
            </ListGroup>
        </Card>
    )
}

export default GameBox