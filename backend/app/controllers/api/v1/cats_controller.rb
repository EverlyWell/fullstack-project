module Api
  module V1
    class CatsController < ApplicationController
      include ::UserScopeableController
      include ::CatsApieableController

      def index
        search_url = "#{base_url}/images/search"
        params = {}
        params['category_ids'] = category_ids
        params['limit'] = limit
        params['page'] = page
        params['order'] = order
        response = Faraday.get(search_url, params, headers)
        return render nothing: true, status: :no_content unless response.status == 200

        cats_response = {
          cats: JSON.parse(response.body),
          pagination: {
            count: response.headers['pagination-count'].to_i,
            page: response.headers['pagination-page'].to_i,
            limit: response.headers['pagination-limit'].to_i
          }
        }
        render json: cats_response
      end

      private

      def category_ids
        return '' unless params[:category_ids].present?
        params[:category_ids]
      end
    end
  end
end
