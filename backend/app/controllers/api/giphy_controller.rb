module Api
  class GiphyController < ApiController
    def search
      data = GiphySearcher.call(search_params)
      render json: data
    end

    private

    def search_params
      params.permit(:q, :offset)
    end
  end
end
