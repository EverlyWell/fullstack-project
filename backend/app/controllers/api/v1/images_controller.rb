class Api::V1::ImagesController < ApplicationController
  PAGE_LIMIT = 20

  # GET /api/v1/images
  def index
    giphy_api_client = GiphyApi::Client.new

    page = params[:page].to_i.positive? ? params[:page].to_i : 1
    offset = (page - 1) * PAGE_LIMIT
    q = params[:q]

    begin
      @images = giphy_api_client.image_search({ q: q, offset: offset, limit: PAGE_LIMIT })

      render json: normalize_images
    rescue => e
      render json: e, status: :bad_request
    end

  end

  private

  def search_params
    params.permit(:q, :page)
  end

  def normalize_images
    images = @images.map do |image|
      favorite = current_user.favorite_images.with_source_id(image[:id])
      {
        id: favorite.present? ? favorite.first.id : nil,
        source_id: image[:id],
        url: image[:images][:fixed_height][:url] || image[:images][:original][:url],
        favorite: favorite.present?
      }
    end
  end
end
