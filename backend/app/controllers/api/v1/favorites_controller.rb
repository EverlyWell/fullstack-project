module Api
  module V1
    class FavoritesController < ApplicationController
      def show
        render json: Favorite::Base.all
      end
    end
  end
end
