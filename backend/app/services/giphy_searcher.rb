class GiphySearcher < ApplicationService
  attr_reader :query

  def initialize(query)
    @query = query
  end

  def call
    path = "/v1/gifs/search?q=#{@query}&api_key=#{Rails.application.credentials.giphy[:api_key]}"
    uri = URI("https://api.giphy.com#{path}")
    res = Net::HTTP.get_response(uri)
    JSON.parse res.body
  end
end
