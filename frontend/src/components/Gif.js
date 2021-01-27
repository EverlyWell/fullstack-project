import React from 'react';
import {Grid, Card, Image, Button} from 'semantic-ui-react'


const Gif = (props) => {
    const handleClick = (e) => {
        e = props.gif
        props.handleFavorited(e)
    }
    return(
        <div className="gif">
        <Grid.Column>
            <Card id={props.gif.id}>
                <Image src={props.gif.url} alt="gif" />
                <Card.Content>
                <Card.Header>{props.gif.title}</Card.Header>
                <Button color="green" onClick={handleClick}>Favorite</Button>
                </Card.Content>
            </Card>
        </Grid.Column>
        </div>
    )
}

export default Gif