module Api
  class FavsController < ApplicationController
    skip_forgery_protection

    def create
      fav = Fav.create!(permitted_params)

      render json: { fav: fav.id }
    end

    def index
      favs = Fav.all.order(:created_at)

      render json: favs.to_json
    end

    private

    def permitted_params
      params.permit(:giphy_id)
    end
  end
end
