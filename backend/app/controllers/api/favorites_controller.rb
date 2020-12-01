class Api::FavoritesController < ApplicationController
  def index
    @favorites = Favorite.all
    gifs = get_favorites
    render json: { data: gifs}
  end

  def create
    @favorite = @user.favorites.new(favorite_params)
    if @favorite.save
      render json: { status: :created, favorite: @favorite }
    else
      render json: { status: 500, error: @favorite.errors.full_messages }
    end
  end

  def destroy
    @favorite = @user.favorites.find_by(giphy_id: favorite_params[:giphy_id])
    if @favorite.destroy
      head :no_content
    else
      render json: { status: 500, error: @favorite.errors.full_messages }
    end
  end

  private

  def favorite_params
    params.require(:favorite).permit(:giphy_id)
  end

  def giphy_client
    api_key = Rails.application.credentials.giphy[:key]
    @giphy_client ||= Giphy.new( api_key )
  end

  def get_favorites
    gifs = []
    ## No batch call :-(
    @favorites.each do |fav|
      gifs << giphy_client.find_by_id(fav.giphy_id)[:data]
    end
    gifs
  end
end
