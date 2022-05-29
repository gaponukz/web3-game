import Container from 'react-bootstrap/Container'

const GameContainer = props => {
    return (
        <Container style={{maxWidth: '600px'}}>
            {props.children}
        </Container>
    )
}

export default GameContainer