module Api
  module V1
    class FavoritesController < ApplicationController
      def show
        respond_with current_user.favorites
      end

      def destroy
        current_user.favorites.where(slug: favorite_params[:favorite][:slug], type: favorite_params[:favorite][:type]).delete_all
      end

      def create
        current_user.favorites << Favorite::Base.create(favorite_params[:favorite])
      end

      private

      def favorite_params
        params.permit(:favorite => [:slug, :type])
      end
    end
  end
end
