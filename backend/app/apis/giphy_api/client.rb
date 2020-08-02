module GiphyApi
  class Client
    include HttpStatusCodes
    include ApiExceptions

    BASE_URL = 'https://api.giphy.com/v1/gifs'.freeze

    def image_search(params = {})
      request(
        http_method: :get,
        endpoint: 'search',
        params: params
      )
    end

    private

    def client
      @_client ||= Faraday.new(BASE_URL) do |faraday|
        faraday.request :url_encoded
        faraday.adapter Faraday.default_adapter
        faraday.params['api_key'] = ENV['GIPHY_API_KEY']
      end
    end

    def request(http_method:, endpoint:, params: {})
      response = client.public_send(http_method, endpoint, params)
      parsed_response = JSON.parse(response.body, :symbolize_names => true)

      return parsed_response[:data] if request_successful?(response)

      raise error_class(response), "HTTP Code: #{response.status}, response: #{response.body}"
    end

    def error_class(response)
      case response.status
      when HTTP_BAD_REQUEST_CODE
        BadRequestError
      when HTTP_UNAUTHORIZED_CODE
        UnauthorizedError
      when HTTP_FORBIDDEN_CODE
        ForbiddenError
      when HTTP_NOT_FOUND_CODE
        NotFoundError
      when HTTP_UNPROCESSABLE_ENTITY_CODE
        UnprocessableEntityError
      else
        ApiError
      end
    end

    def request_successful?(response)
      response.status == HTTP_OK_CODE
    end

  end
end