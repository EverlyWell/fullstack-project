class Api::V1::FavoritesController < ApplicationController

  def index
    @favorites = logged_in_user.favorites
    render json: @favorites
  end
    
  def create
    save_params = favorite_params.clone
    save_params["user_id"] = logged_in_user.id
    @favorite = Favorite.new(save_params)
    
    if @favorite.save
      render json: [], status: :ok
    else
      render json: @favorite.errors, status: :unprocessable_entity
    end
  end

  def delete
    @giphy_id = favorite_params[:giphy_id]
    Favorite.where(giphy_id: @giphy_id, used_id: logged_in_user.id).destroy

    render json: :nothing, status: :ok
  end
  

  private

  def favorite_params
    params.require(:favorite).permit(:giphy_id, :url, :name)
  end
  
end
