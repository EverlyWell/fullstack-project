import { FunctionComponent } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { ICat } from "../../typings/typings";

interface ICatCardView {
  cat: ICat;
  index: number;
  onAddFavoriteClick: any;
}

const CatCardView: FunctionComponent<ICatCardView> = ({
  cat, index, onAddFavoriteClick
}) => {
  return (
    <Grid
      item xs={4}
      key={`cat_grid_item_${index}`}
    >
      <Card
        key={`cat_card_${index}`}
      >
        <CardMedia
          component="img"
          image={cat.url}
          alt={cat.id}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            id: {cat.id}<br/>
            Breeds: {cat.breeds.length > 0 ? cat.breeds?.join(',') : '-'}<br/>
            Dimensions: {cat.height}x{cat.width}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            size="small"
            onClick={()=> onAddFavoriteClick(cat.id)}
          >
            Add Fav
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CatCardView;
