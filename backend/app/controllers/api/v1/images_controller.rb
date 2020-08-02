class Api::V1::ImagesController < ApplicationController

  # GET /api/v1/images
  def index
    giphy_api_client = GiphyApi::Client.new

    begin
      resp = giphy_api_client.image_search(search_params)

      render json: resp
    rescue => e
      render json: e, status: :bad_request
    end

  end

  private

  def search_params
    params.permit(:q)
  end
end
