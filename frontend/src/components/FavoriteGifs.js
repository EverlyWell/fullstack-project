import React from 'react';
import {Grid, Card, Image} from 'semantic-ui-react'


const FavoriteGifs = (props) => {
    return(
        <div>
            <Grid.Column>
                <Card id={props.favoriteGifs.id}>
                <Image src={props.favoriteGifs.url} alt={props.favoriteGifs.title} />
                <Card.Content>
                <Card.Header>{props.favoriteGifs.title}</Card.Header>
                </Card.Content>
                </Card>
            </Grid.Column>
        </div>
    )
}

export default FavoriteGifs