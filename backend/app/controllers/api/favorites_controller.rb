class Api::FavoritesController < ApplicationController
    def index
        @favorites = Favorite.all
        render json: @favorites
    end

    def create
        @favorite = Favorite.new(favorite_params)
        if @favorite.save
            render json: @favorite
        else
            render json: @favorite.errors.full_messages, status: :not_acceptable
        end
    end

    private

    def favorite_params
        params.require(:favorite).permit!
    end
    
end
