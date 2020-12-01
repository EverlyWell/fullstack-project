## FROM https://github.com/Giphy/giphy-ruby-client#installation
require 'GiphyClient'
class Giphy

  def initialize(api_key, opts = false)
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
      result = @api_instance.gifs_search_get(@api_key, query, @opts)
      parsed_results = merge_with_favorites(result.data)

      {error: false, data: parsed_results}
    rescue GiphyClient::ApiError => e
      {error: true, data: e.message}
    end
  end

  private

  def merge_with_favorites(giphy_images)
    ids = giphy_images['data'].map {|img| img['id']}
    favorites = Favorites.where(giphy_id: ids).pluck(:giphy_id)
    giphy_imagesp['data'].each_with_index do |img, idx|
      if favorites.include?(img['id'])
        giphy_images['data'][idx]['favorited'] = true
      end
    ends
  end

end