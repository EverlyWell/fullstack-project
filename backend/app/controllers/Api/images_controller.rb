class Api::ImagesController < ApplicationController
  def index
    render json: CatAPI.new.search(params.permit(:category_ids, :breed_id), current_user)
  end
end