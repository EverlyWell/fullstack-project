require 'test_helper'

class FavoritesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @favorite = Favorite::Giphy.create(slug: 'abc123')
  end

  test "returns favorites" do
    get '/api/v1/favorites'

    response_body = JSON.parse(response.body).first
    assert_equal @favorite.slug, response_body['slug']

    assert_response 200
  end
end
