## FROM https://github.com/Giphy/giphy-ruby-client#installation
require 'GiphyClient'
class Giphy

  def initialize(api_key, opts)
    @api_key = api_key
    @opts = opts || {
      limit: 25, # Integer | The maximum number of records to return.
      offset: 0, # Integer | An optional results offset. Defaults to 0.
      rating: "g", # String | Filters results by specified rating.
      lang: "en", # String | Specify default country for regional content; use a 2-letter ISO 639-1 country code. See list of supported languages <a href = \"../language-support\">here</a>.
      fmt: "json" # String | Used to indicate the expected response format. Default is Json.
    }
    @api_instance = GiphyClient::DefaultApi.new
  end

  def search(query)
    begin
      #Search Endpoint
      result = api_instance.gifs_search_get(@api_key, query, @opts)
      {error: false, data: result}
    rescue GiphyClient::ApiError => e
      {error: true, data: e.message}
    end
  end
end