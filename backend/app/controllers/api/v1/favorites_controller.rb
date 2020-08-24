module Api
  module V1
    class FavoritesController < ApplicationController
      def show
        render json: Favorite::Base.all
      end

      def destroy
        Favorite::Base.where(slug: favorite_params[:favorite][:slug], type: favorite_params[:favorite][:type]).delete_all
      end

      def create
        Favorite::Base.create(favorite_params[:favorite])
      end

      private

      def favorite_params
        params.permit(:favorite => [:slug, :type])
      end
    end
  end
end
