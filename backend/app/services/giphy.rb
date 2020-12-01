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
      results = @api_instance.gifs_search_get(@api_key, query, @opts)

      parsed_results = merge_with_favorites(JSON.parse(results.data.to_json)) if results.data
      {error: false, data: parsed_results}
    rescue GiphyClient::ApiError => e
      {error: true, data: e.message}
    end
  end

  def find_by_id(id)
    begin
      #Search Endpoint
      results = @api_instance.gifs_gif_id_get(@api_key, id, @opts)
      {error: false, data: results.data}
    rescue GiphyClient::ApiError => e
      {error: true, data: e.message}
    end
  end

  private

  def merge_with_favorites(giphy_images)
    ids = giphy_images.map {|img| img['id']}
    favorites = Favorite.where(giphy_id: ids).pluck(:giphy_id)

    giphy_images.each_with_index do |img, idx|
      if favorites.include?(img['id'])
        giphy_images[idx]['favorited'] = true
      else
        giphy_images[idx]['favorited'] = false
      end
    end
    giphy_images
  end
end