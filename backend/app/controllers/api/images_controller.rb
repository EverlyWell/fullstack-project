# frozen_string_literal: true

module Api
  # Images search proxy
  class ImagesController < ApplicationController
    PER_PAGE = 25

    # GET /api/images/search - Search for an image
    #   params:
    #     - query: Query to search for
    #     - page: Page of search result
    def search
      page = params[:page].to_i.positive? ? params[:page].to_i : 1
      offset = (page - 1) * PER_PAGE
      @api_result = ImageClient.new.search(params[:query], { offset: offset, limit: PER_PAGE })
      process_favorites

      render json: @api_result
    end

    private

    # Find current user favorites out of the queried results and mark them
    def process_favorites
      source_ids = @api_result.map { |image| image[:source_id] }
      favorites = FavoriteImage.hash_for_source_ids(current_user, source_ids)

      @api_result.each do |image|
        favorite_id = favorites[image[:source_id]]
        next if favorite_id.blank?

        image[:id] = favorite_id
        image[:favorite] = true
      end
    end
  end
end
