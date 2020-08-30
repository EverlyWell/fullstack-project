class Api::FavoritesController < ApplicationController
  def index
    favorites = Favorite.all
    render json: favorites
  end

end
