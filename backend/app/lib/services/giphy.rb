class Services::Giphy
  # Code yanked from https://github.com/Giphy/giphy-ruby-client#getting-started-1

  def initialize
    @api_instance = GiphyClient::DefaultApi.new

    @api_key = "dc6zaTOxFJmzC" # String | Giphy API Key.

    @options = {
        limit: 25, # Integer | The maximum number of records to return.
        offset: 0, # Integer | An optional results offset. Defaults to 0.
        rating: "g", # String | Filters results by specified rating.
        lang: "en", # String | Specify default country for regional content; use a 2-letter ISO 639-1 country code. See list of supported languages <a href = \"../language-support\">here</a>.
        fmt: "json" # String | Used to indicate the expected response format. Default is Json.
    }
  end

  def search(query)
    begin
      #Search Endpoint
      @api_instance.gifs_search_get(@api_key, query, @options)
    rescue GiphyClient::ApiError => e
      puts "Exception when calling DefaultApi->gifs_search_get: #{e}"
    end
  end

  def self.thumbnail(id)
    "https://media0.giphy.com/media/#{id}/100.gif"
  end

  def self.translate_data(data, favorited_slugs)
    data.map do |item|
      { slug: item.id, thumbnail: thumbnail(item.id), source: 'Giphy', isFavorite: favorited_slugs.include?(item.id) }
    end
  end
end