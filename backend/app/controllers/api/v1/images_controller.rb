module Api
  module V1
    class ImagesController < ApplicationController
      def search
        source = search_params[:source]&.to_sym || :giphy

        case source
          when :giphy
            giphy_service = Services::Giphy.new
            response = giphy_service.search(search_params[:query])
            response.data = Services::Giphy.translate_data(response.data)
          else
            # Implement search capabilities for the API, TheCatAPI, etc...
            raise ArgumentError.new "Source of type of: #{source} has not het been implemented."
        end

        render json: { data: response.data }
      end

      private

      def search_params
        params.permit(:query, :source)
      end
    end
  end
end
