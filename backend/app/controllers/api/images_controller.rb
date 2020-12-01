class Api::ImagesController < ApplicationController
  def search
    query = params[:query]
    if query.nil?
      render json: {error: true, data: 'Please provide a search term'}
    else
       response = giphy_client.search( query )
      if response[:error] === true
        render json: response, status: 400
      else
        render json: response
      end
    end
  end


  private

  def giphy_client
    api_key = Rails.application.credentials.giphy[:key]
    @giphy_client ||= Giphy.new( api_key )
  end
end
