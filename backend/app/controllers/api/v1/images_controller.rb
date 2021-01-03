require 'giphy'

class Api::V1::ImagesController < ApplicationController
  skip_before_action :authenticated
  
  def search
    @images = Giphy.search(params[:search])
    
    render json: @images, status: :ok
  end

end
