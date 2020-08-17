class CatAPI
  API_ENDPOINT = 'https://api.thecatapi.com/v1'.freeze
  DEFAULT_LIMIT = 20
  DEFAULT_SIZE = 'full'
  attr_reader :conn

  CatImage = Struct.new(:id, :url, :fav_id)
  def initialize(api_key: nil)
    @api_key = api_key || '0b9c21fb-1889-4708-a4c6-2862f4bf68a3'
    @conn = Faraday.new(
      url: API_ENDPOINT,
      headers: { 'Content-Type' => 'application/json',
                 'Accept' => 'application/json',
                 'x-api-key' => @api_key }
    )
  end

  def search(query, user=nil)
    params = { limit: DEFAULT_LIMIT, size: DEFAULT_SIZE, order: 'Desc' }. merge(query)
    res = conn.get('images/search') do |req|
      req.params = req.params.merge(params)
    end
    imgs = Oj.load(res.body).map{|img| CatImage.new(img['id'], img['url'])}
    add_fav_ids(imgs, user)
  end

  private
  def add_fav_ids(cat_images, user)
    img_ids = cat_images.map(&:id)
    fav_ids = Favorite.where(identifier: img_ids, user: user).map{|f| [f.identifier, f.id]}.to_h
    cat_images.each do |img|
      img[:fav_id] = fav_ids[img.id]
    end
  end

end
