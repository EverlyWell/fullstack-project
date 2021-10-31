module Api::V1
  class FavouritesController < ApplicationController
    include ::UserScopeableController
    include ::CatsApieableController

    def index
      search_url = "#{base_url}/favourites"
      params = {}
      params['sub_id'] = sub_id if sub_id.present?
      params['limit'] = limit
      params['page'] = page
      params['order'] = order
      response = Faraday.get(search_url, params, headers)
      favs_response = {
        favs: JSON.parse(response.body),
        pagination: {
          count: response.headers['pagination-count'].to_i,
          page: response.headers['pagination-page'].to_i,
          limit: response.headers['pagination-limit'].to_i
        }
      }
      render json: favs_response
    end

    def create
      payload = {}
      payload['image_id'] = params['image_id']
      payload['sub_id'] = if params['sub_id']
                            params['sub_id']
                          else
                            @current_user.email
                          end
      json_params = payload.to_json
      response = Faraday.post("#{base_url}/favourites", json_params, headers)
      render json: response.body
    end

    def destroy
      destroy_url = "#{base_url}/favourites/#{params[:id]}"
      response = Faraday.delete(destroy_url, nil, headers)
      render json: response.body
    end

    private

    def sub_id
      params[:sub_id] || ''
    end
  end
end
