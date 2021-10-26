import { FunctionComponent } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { IFav } from "../../typings/typings";

interface IFavCardView {
  fav: IFav;
  index: number;
  onRemoveFavoriteClick: any;
}

const FavCardView: FunctionComponent<IFavCardView> = ({
  fav, index, onRemoveFavoriteClick
}) => {
  return (
    <Grid
      item xs={4}
      key={`fav_grid_item_${index}`}
    >
      <Card
        key={`fav_card_${index}`}
      >
        <CardMedia
          component="img"
          image={fav.image.url}
          alt={fav.image_id}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            id: {fav.id}
            Created at: {fav.created_at}<br/>
            user_id: {fav.user_id}<br/>
            sub_id: {fav.sub_id}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            size="small"
            onClick={()=> onRemoveFavoriteClick(fav.id)}
          >
            Remove Fav
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default FavCardView;
