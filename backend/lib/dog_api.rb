class DogApi
  def self.fetch()
      begin
          url = "https://api.thedogapi.com/v1/breeds"
          response = RestClient.get(url, { "x-api-key": Rails.application.credentials[:dog_api_key] })
          JSON.parse(response.body)
      rescue => exception
          default_response
      end
  end

  def self.search(query = nil)
      begin
        url = "https://api.thedogapi.com/v1/breeds/search"
        response = RestClient.get(url, { params: { q: query }, "x-api-key": Rails.application.credentials[:dog_api_key] })
        JSON.parse(response.body)
      rescue => exception
        default_response
      end
  end

  def self.get_image(image_id)
      begin
        url = "https://api.thedogapi.com/v1/images/#{image_id}"
        response = RestClient.get(url, { "x-api-key": Rails.application.credentials[:dog_api_key] })
        JSON.parse(response.body)
      rescue => exception
          default_response
      end
  end

  def self.default_response 
      {
          "status": "Failure",
          "message": "Uh Oh, Something is amiss. Please refresh or read the API response"
      }
  end
end
