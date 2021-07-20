require 'json'
class DogApi
  BASE_URL  = ENV['BASE_URL']
  LIMIT     = 10
  attr_reader :data

  Dog = Struct.new(:dog_id, :url)
  Favorite = Struct.new(:id, :url)
  def initialize(api_key: nil)
    @api_key  = ENV['API_KEY']
    @data     = Faraday.new(url: BASE_URL,
      headers: { content_type: 'application/json',
                 accept: 'application/json',
                 'x-api-key' => @api_key }
      )
  end

  # GET - Searching of dogs
  def search(breed_name)
    search_params = { limit: LIMIT, breeds: {breed_group: breed_name["breed_name"]} }
    results = @data.get('images/search') do |res|
      res.params = res.params.merge(search_params)
    end
    JSON.parse(results.body).map {|img| Dog.new(img['id'], img['url'])}
  end
  
  # POST - Favoriting of images
  def favorite(user_id, breed_id)
    id = user_id
    @data.post 'favourites', {image_id: breed_id["breed_id"], sub_id: id }.to_json
  end

  # GET - Viewing favorited images
  def user_favorites(user_id)
    user_favorites_params = {sub_id: user_id}
    results = @data.get('favourites') do |res|
      res.params = res.params.merge(user_favorites_params)
    end
    JSON.parse(results.body).map {|fav| Favorite.new(fav["image"]["id"], fav["image"]["url"])}
  end
end