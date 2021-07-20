class Api::DogsController < ApplicationController

  def index
    @dog = DogApi.new.search(dog_params)
    if !@dog.nil?
      render json: @dog
    else
      render json: {message: "Cant load dogs"}
    end
  end

  private

  def dog_params
    params.permit(:breed_name)
  end
end
