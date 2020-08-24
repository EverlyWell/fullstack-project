module Api
  module V1
    class ImagesController < ApplicationController
      def search
        source = search_params[:source]&.to_sym || :giphy

        case source
          when :giphy
            giphy_service = Services::Giphy.new
            response = giphy_service.search(search_params[:query])
            favorite_slugs = Favorite::Giphy.pluck(:slug)
            response.data = Services::Giphy.translate_data(response.data, favorite_slugs)
          else
            # Implement search capabilities for the API, TheCatAPI, etc...
            raise ArgumentError.new "Source of type of: #{source} has not het been implemented."
        end

        respond_with({ data: response.data })
      end

      private

      def search_params
        params.permit(:query, :source)
      end
    end
  end
end
