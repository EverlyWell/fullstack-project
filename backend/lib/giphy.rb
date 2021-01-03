require 'net/http'

SEARCH_ENDPOINT = 'https://api.giphy.com/v1/gifs/search'.freeze
API_KEY = Rails.application.credentials.config[:GIPHY_API_KEY]

class Giphy
  def self.search(query)
    uri = URI("#{SEARCH_ENDPOINT}?q=#{query}&api_key=#{API_KEY}")
    res = Net::HTTP.get_response(uri)
    res.body
  end
end

