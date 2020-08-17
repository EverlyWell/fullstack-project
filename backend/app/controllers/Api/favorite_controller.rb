class Api::FavoriteController < ApplicationController

  def create
    fav = Favorite.find_or_create_by(favorite_params)
    if fav.errors.present?
      render json: fav.errors.messages, status: :failed
    else
      render json: Favorite.find_or_create_by(favorite_params), status: :created
    end
  end

  def index
    favs = Favorite.where(user: current_user)
    render json: favs.as_json(except: 'identifier')
  end

  def destroy
    fav =  Favorite.find_by_id(params[:id])
    if fav&.destroy
      render json: :deleted, status: :ok
    else
      render json: 'resource not found', status: 410
    end

  end

  private
  def favorite_params
    params.require(:favorite).permit(:identifier, :url).merge({user: current_user})
  end
end
