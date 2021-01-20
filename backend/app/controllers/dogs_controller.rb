class DogsController < ApplicationController

  # This route will return an array of all dog 
  # breeds in the DogAPI database
  def index
    @dogs = DogApi.fetch
    render json: @dogs
  end

  # This route will return an array of all breeds 
  # that match the given query by breed name
  def search
    if params[:q].present?
      @dogs = DogApi.search(params[:q])
      render json: @dogs
    else
      render json: Array.new
    end
  end

  # This route will return an array with a single result that contains 
  # the image information based off the breed reference_image_id
  def image
    if params[:image_id].present?
      @dogs = DogApi.get_image(params[:image_id])
      render json: @dogs
    else
      render json: Array.new
    end
  end

end
