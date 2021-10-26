module Api::V1
  class CategoriesController < ApplicationController
    BASE_URL = 'https://api.thecatapi.com/v1'.freeze

    def index
      response = Faraday.get("#{BASE_URL}/categories?api_key=#{api_key}")
      render json: response.body if response.status == 200
    end

    private

    def api_key
      ENV['CATS_API_KEY']
    end
  end
end
