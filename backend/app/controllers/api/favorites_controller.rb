class Api::FavoritesController < ApplicationController
  def index
    @favorites = Favorite.all
    render json: { favorites: @favorites }
  end
  
  def create
    @favorite = Favorite.new(favorite_params)
    if @favorite.save
      render json: { status: :created, favorite: @favorite }
    else
      render json: { status: 500, error: @favorite.errors.full_messages }
    end
  end
  
  def destroy
    @favorite = Favorite.find_by(giphy_id: params[:id])
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
end
