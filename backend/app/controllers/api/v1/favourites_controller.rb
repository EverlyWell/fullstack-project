module Api::V1
  class FavouritesController < ApplicationController
    BASE_URL = 'https://api.thecatapi.com/v1'.freeze

    DEFAULT_LIMIT = '3'.freeze

    skip_before_action :verify_authenticity_token, only: [:create, :destroy]

    def index
      sub_id_param = sub_id.present? ? "&sub_id=#{sub_id}" : ''
      search_url = "#{BASE_URL}/favourites?api_key=#{api_key}&limit=#{limit}&page=#{page}&order=#{order}#{sub_id_param}"
      response = Faraday.get(search_url)
      favs_response = {
        favs: JSON.parse(response.body),
        pagination: {
          count: response.headers['pagination-count'].to_i,
          page: response.headers['pagination-page'].to_i,
          limit: response.headers['pagination-limit'].to_i
        }
      }
      render json: favs_response
    end

    def create
      payload = {}
      payload['image_id'] = params['image_id']
      payload['sub_id'] = params['sub_id'] unless params['sub_id'].blank?
      json_params = payload.to_json
      headers = {
        'Content-Type': 'application/json',
        'x-api-key': api_key
      }
      response = Faraday.post("#{BASE_URL}/favourites", json_params, headers)
      render json: response.body
    end

    def destroy
      destroy_url = "#{BASE_URL}/favourites/#{params[:id]}?api_key=#{api_key}"
      response = Faraday.delete(destroy_url)
      render json: response.body
    end
    \
    private

    def sub_id
      params[:sub_id] || ''
    end

    def limit
      params[:limit] || DEFAULT_LIMIT
    end

    def page
      params[:page] || '1'
    end

    def order
      params[:order] || 'Asc'
    end

    def api_key
      ENV['CATS_API_KEY']
    end
  end
end
