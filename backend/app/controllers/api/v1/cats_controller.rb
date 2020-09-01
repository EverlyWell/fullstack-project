module Api::V1
  class CatsController < ApplicationController

    def breeds
      @breeds = CatsService.breeds
    end

    def categories
      @categories = CatsService.categories
    end

    def search
      breed_id = cat_params[:breed_id]
      category_id = cat_params[:category_id]
      limit = cat_params[:limit]
      animated = cat_params[:animated] == "true" ? true : false
      @breeds = CatsService.search(breed_id, category_id, limit, animated)
    end

    def search_by_breed
      breed_id = cat_params[:breed_id]
      limit = cat_params[:limit]
      @breeds = CatsService.search_by_breed(breed_id, limit)
    end

    def favorites
      @favorites = CatsService.my_favorites
    end

    private

    def cat_params
      params.permit(:breed_id, :category_id, :limit, :format, :animated)
    end

  end
end
