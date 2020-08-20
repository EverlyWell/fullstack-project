class GiphySearcher < ApplicationService
  attr_reader :params

  def initialize(params)
    q = params[:q] || ''
    offset = params[:offset] || 0
    @params = {q: q, offset: offset}
  end

  def call
    path = '/v1/gifs/search'
    query = "?q=#{@params[:q]}"
    query += "&offset=#{@params[:offset]}"
    query += "&api_key=#{Rails.application.credentials.giphy[:api_key]}"
    uri = URI("https://api.giphy.com#{path}#{query}")
    res = Net::HTTP.get_response(uri)
    JSON.parse res.body
  end
end
