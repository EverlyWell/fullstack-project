require 'test_helper'

class FavoritesControllerTest < ActionDispatch::IntegrationTest
  test "show favorites" do
    favorite = Favorite::Giphy.create(slug: 'abc123')

    get '/api/v1/favorites'

    response_body = JSON.parse(response.body).first
    assert_equal favorite.slug, response_body['slug']

    assert_response :success
  end

  test "create favorite" do
    expected_attributes = { 'type' => 'Favorite::Giphy', 'slug' => 'zyx321' }

    post '/api/v1/favorites', params: { favorite: expected_attributes }

    last_favorite_with_expected_attributes = Favorite::Base.last.attributes.slice('type', 'slug')
    assert_equal expected_attributes, last_favorite_with_expected_attributes

    assert_response 204
  end

  test "delete favorite" do
    expected_slug = 'lmn567'
    Favorite::Giphy.create(slug: expected_slug)

    delete '/api/v1/favorites', params: { favorite: { type: 'Favorite::Giphy', slug: expected_slug }}

    refute Favorite::Base.where(slug: expected_slug).any?

    assert_response 204
  end
end
