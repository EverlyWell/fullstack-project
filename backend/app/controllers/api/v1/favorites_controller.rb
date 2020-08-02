class Api::V1::FavoritesController < ApplicationController
  # GET /api/v1/favorites
  def index
    images = current_user.favorite_images.order(created_at: :desc)
    render json: images
  end

  # POST /api/v1/favorites
  def create
    favorite_image = current_user.favorite_images.new(create_params)

    if favorite_image.save
      render json: { id: favorite_image.id, source_id: favorite_image.source_id }, status: :ok
    else
      render json: { error: favorite_image.errors.full_messages.to_sentence }, status: :bad_request
    end
  end

  # DELETE /api/v1/favorites/:id
  def destroy
    favorite_image = current_user.favorite_images.find(params[:id])
    favorite_image.destroy

    render json: {}, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Not found' }, status: :not_found
  end

  private

  def create_params
    params.permit(:source_id, :url)
  end
end
