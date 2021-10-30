# Cats API concern to include related methods.
module CatsApieableController
  extend ActiveSupport::Concern

  BASE_URL = 'https://api.thecatapi.com/v1'.freeze

  DEFAULT_LIMIT = '3'.freeze

  private

  def limit
    params[:limit] || DEFAULT_LIMIT
  end

  def page
    params[:page] || '1'
  end

  def order
    params[:order] || 'Asc'.freeze
  end

  def base_url
    ENV['CATS_API_URL'] || BASE_URL
  end

  def api_key
    ENV['CATS_API_KEY']
  end

  def headers
    {
      'Content-Type': 'application/json',
      'x-api-key' => api_key
    }
  end
end