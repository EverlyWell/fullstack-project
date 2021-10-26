module Api::V1
  class CatsController < ApplicationController
    BASE_URL = 'https://api.thecatapi.com/v1'.freeze

    DEFAULT_LIMIT = '3'.freeze

    def index
      search_url = "#{BASE_URL}/images/search?api_key=#{api_key}&category_ids=#{category_ids}&limit=#{limit}&page=#{page}&order=#{order}"
      response = Faraday.get(search_url)
      return render nothing: true, status: :no_content unless response.status == 200

      cats_response = {
        cats: JSON.parse(response.body),
        pagination: {
          count: response.headers['pagination-count'].to_i,
          page: response.headers['pagination-page'].to_i,
          limit: response.headers['pagination-limit'].to_i
        }
      }
      render json: cats_response
    end

    private

    def category_ids
      return '' unless params[:category_ids].present?
      params[:category_ids]
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
