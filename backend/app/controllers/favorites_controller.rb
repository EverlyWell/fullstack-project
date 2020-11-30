class FavoritesController < ApplicationController
  def index
    @favorites = Favorite.all
    render json: { favorites: @favorites }
  end

  def create
    @favorite = Favorite.create(favorite_params)
    if @favorite.save
      render json: { status: :created, favorite: @favorite }
    else
      render json: { status: 500, error: @favorite.errors.full_messages }
    end
  end

  def destroy
    @favorite = Favorite.find_by(giphy_id: favorite_params[:gihpy_id])
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
