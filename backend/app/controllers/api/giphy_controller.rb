module Api
  class GiphyController < ApiController
    def search
      data = GiphySearcher.call(search_params[:q])
      render json: data
    end

    private

    def search_params
      params.permit(:q)
    end
  end
end
