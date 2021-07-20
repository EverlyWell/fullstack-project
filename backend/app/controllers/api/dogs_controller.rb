class Api::DogsController < ApplicationController

  def index
    @dog = DogApi.new.search(dog_params)
    if !@dog.nil?
    render json: @dog
    else
      render json: {message: "Cant load dogs"}
    end
  end

  def favorite
    user_id = user.id.to_s
    @favorite = DogApi.new.favorite(user_id, favorite_params)
    if !@favorite.nil?
      render json: @favorite
    else
      render json: {message: "Cant load dogs"}
    end
  end

  def user_favorites
    user_id = user.id.to_s
    @dog = DogApi.new.user_favorites(user_id)
    if !@dog.nil?
      render json: @dog
    else
      render json: {message: "Cant favorited dogs"}
    end
  end

  private

  def dog_params
    params.permit(:breed_name)
  end

  def favorite_params
    params.permit(:breed_id)
  end
end