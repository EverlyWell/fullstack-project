require 'rest-client'

module CatsService

  BASE_URL = "https://api.thecatapi.com/v1"
  SEARCH_URL = "#{BASE_URL}/images/search?"

  def self.breeds
    url = "#{BASE_URL}/breeds"
    fetch(url)
  end

  def self.categories
    url = "#{BASE_URL}/categories"
    fetch(url)
  end
  
  def self.search(breed_id, category_id, limit)
    params = "category_ids=#{category_id}&breed_id=#{breed_id}&limit=#{limit}"
    fetch(SEARCH_URL + params)
  end

  def self.search_by_breed(breed_id, limit)
    params = "breed_ids=#{breed_id}&limit=#{limit}&size=small"
    fetch(SEARCH_URL + params)
  end

  def self.my_favorites
    # WIP
    url = "#{BASE_URL}/favourites"
    fetch(url)
  end

  private

  def self.fetch(url)
    api_key = Rails.application.credentials[:cats_api]
    headers = { 'Content-Type': 'application/json', 'x-api-key': api_key }
    JSON.parse(RestClient.get(url, headers).body)
  end

end
