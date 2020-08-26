require 'test_helper'
require 'devise/jwt/test_helpers'

class Api::V1::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @password = 'testpass'
    @user = User.create(email: Faker::Internet.email, password: @password)
  end

  test "user receives a JWT token" do
    headers = { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }

    post '/api/v1/login?format=json', headers: headers, params: { user: { email: @user.email, password: @password }}.to_json
    puts response.body
    puts response.headers

    assert response.headers["Authorization"].include?('Bearer')
    assert_response :success
  end
end