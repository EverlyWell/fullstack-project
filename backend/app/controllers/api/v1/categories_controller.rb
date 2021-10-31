module Api::V1
  class CategoriesController < ApplicationController
    include ::UserScopeableController
    include ::CatsApieableController

    def index
      response = Faraday.get("#{BASE_URL}/categories", headers)
      render json: response.body if response.status == 200
    end
  end
end
