class Api::ImagesController < ApplicationController
  def index
    render json: CatAPI.new.search(term: params[:sSearch])
  end
end