require 'test_helper'
require 'devise/jwt/test_helpers'

class FavoritesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create(email: Faker::Internet.email, password: 'testpass')

    headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
    @auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, @user)
  end

  test "show favorites" do
    favorite = Favorite::Giphy.create(slug: 'abc123', user: @user)

    get '/api/v1/favorites', headers: @auth_headers

    response_body = JSON.parse(response.body).first
    assert_equal favorite.slug, response_body['slug']

    assert_response :success
  end

  test "create favorite" do
    expected_attributes = { 'type' => 'Favorite::Giphy', 'slug' => 'zyx321' }

    post '/api/v1/favorites', headers: @auth_headers, params: { favorite: expected_attributes }.to_json

    last_favorite_with_expected_attributes = Favorite::Base.last.attributes.slice('type', 'slug')
    assert_equal expected_attributes, last_favorite_with_expected_attributes

    assert_response 204
  end

  test "delete favorite" do
    expected_slug = 'lmn567'
    Favorite::Giphy.create(slug: expected_slug, user: @user)

    delete '/api/v1/favorites', headers: @auth_headers, params: { favorite: { type: 'Favorite::Giphy', slug: expected_slug }}.to_json

    refute Favorite::Base.where(slug: expected_slug).any?

    assert_response 204
  end
end
