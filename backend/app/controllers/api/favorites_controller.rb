# frozen_string_literal: true

module Api
  # Images search proxy
  class FavoritesController < ApplicationController
    # GET /api/favorites - Return a user's favorited images
    def index
      images = current_user.favorite_images.order(created_at: :desc)
      render json: images.map(&:json_data)
    end

    # POST /api/favorites - Mark an image as user's favorite
    #   params:
    #     - image: Image data
    def create
      favorite_image = current_user.favorite_images.new(create_params)
      if favorite_image.save
        render json: { id: favorite_image.id }, status: :ok
      else
        render json: { error: favorite_image.errors.full_messages.to_sentence }, status: :bad_request
      end
    end

    # DELETE /api/favorites/:id - Remove an image from the user favorites list
    #   params:
    #     - id: ID of the favorited image
    def destroy
      # Find error will be rescued from ApplicationController
      favorite_image = current_user.favorite_images.find(params[:id])
      favorite_image.destroy

      render json: {}, status: :ok
    end

    private

    def create_params
      params.require(:image).permit(:source_id, :url, :origin_url)
    end
  end
end
