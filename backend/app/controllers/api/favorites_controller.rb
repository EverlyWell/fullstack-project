class Api::FavoritesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    favorites = Favorite.where(user_id: params[:user_id])
    render json: favorites
  end

  def create
     @favorite = Favorite.create!(favorite_params)
     render json: :created
  end

  def destroy
    @favorite = Favorite.find_by(user_id: params[:user_id], photo_id: params[:photo_id])
    @favorite.destroy
    head :no_content
  end

    private

  def favorite_params
    # whitelist params
    params.permit(:user_id, :photo_id, :photo_url)
  end

end
