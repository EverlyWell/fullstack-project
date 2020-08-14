class CatAPI
  API_ENDPOINT = 'https://api.thecatapi.com/v1/images'.freeze
  DEFAULT_LIMIT = 10
  DEFAULT_SIZE = 'full'
  attr_reader :conn
  CatImage = Struct.new(:url, :id, :width, :height)
  def initialize(api_key: nil)
    @api_key = api_key || '0b9c21fb-1889-4708-a4c6-2862f4bf68a3'
    @conn = Faraday.new(
      url: API_ENDPOINT,
      headers: { 'Content-Type' => 'application/json',
                 'x-api-key' => @api_key }
    )
  end

  def search(**query)
    params = { limit: DEFAULT_LIMIT, size: DEFAULT_SIZE }. merge(query)
    res = conn.get('search') do |req|
      req.params = req.params.merge(params)
      req.headers['Accept'] = 'application/json'
    end
    extract_data(res)
  end

  private
  def extract_data(res)
    Oj.load(res.body).map do |o|
      CatImage.new(o['url'], o['id'], o['width'], o['height'])
    end
  end

end
