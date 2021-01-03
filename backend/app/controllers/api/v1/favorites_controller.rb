class Api::V1::FavoritesController < ApplicationController

  def index
    @favorites = Favorite.all
    render json: @favorites
  end
    
  def create
    @favorite = Favorite.new(favorite_params)
    if @favorite.save
      render json: [], status: :ok
    else
      render json: @favorite.errors, status: :unprocessable_entity
    end
  end

  def delete
    @giphy_id = favorite_params[:giphy_id]
    Favorite.where(giphy_id: @giphy_id).destroy_all

    render json: :nothing, status: :ok
  end
  

  private

  def favorite_params
    params.require(:favorite).permit(:giphy_id, :url, :name)
  end
end
