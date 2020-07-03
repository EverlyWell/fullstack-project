# frozen_string_literal: true

module Api
  # Images search proxy
  class ImagesController < ApplicationController
    # GET /api/images/search - Search for an image
    #   params:
    #     - query: Query to search for
    def search
      render json: ImageClient.new.search(params[:query])
    end
  end
end
