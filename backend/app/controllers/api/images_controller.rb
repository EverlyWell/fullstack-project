class Api::ImagesController < ApplicationController
  def search
    query = params[:query]
    if query.nil?
      render json: {error: true, data: 'Please provide a search term'}
    else
      @giphy_images = giphy_client.search( query )

      merge_with_favorites

      if response[:error]
        render json: response, status: 400
      else
        render json: response, status: 400
      end
    end
  end


  private

  def merge_with_favorites
    ids = @giphy_images.map {|img| img['id']}
    favorites = Favorites.where(giphy_id: ids).pluck(:giphy_id)
    @giphy_images.each_with_index do |img, idx|
      if favorites.include?(img['id'])
        @giphy_images[idx]['favorited'] = true
      end
    end
  end

  def giphy_client
    api_key = Rails.application.credentials.giphy[:key]
    @giphy_client ||= Giphy.new( api_key )
  end
end
