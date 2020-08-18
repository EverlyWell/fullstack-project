require 'rest-client'

module CatsService

  def self.breeds
    url = "https://api.thecatapi.com/v1/breeds"
    fetch(url)
  end

  def self.categories
    url = "https://api.thecatapi.com/v1/categories"
    fetch(url)
  end

  def self.search(breed_id, category_id, limit)
    base_url = "https://api.thecatapi.com/v1/images/search?"
    params = "category_ids=#{category_id}&breed_id=#{breed_id}&limit=#{limit}"
    fetch(base_url + params)
  end

  def self.search_by_breed(breed_id, limit)
    base_url = "https://api.thecatapi.com/v1/images/search?"
    params = "breed_ids=#{breed_id}&limit=#{limit}&size=small"
    fetch(base_url + params)
  end

  def self.my_favorites
    # WIP
    url = "https://api.thecatapi.com/v1/favourites"
    fetch(url)
  end

  private

  def self.fetch(url)
    api_key = Rails.application.credentials[:cats_api]
    headers = { 'Content-Type': 'application/json', 'x-api-key': api_key }
    JSON.parse(RestClient.get(url, headers).body)
  end

end
