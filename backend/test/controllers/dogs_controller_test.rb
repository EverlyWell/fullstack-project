require 'test_helper'

class DogsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get dogs_index_url
    assert_response :success
  end

  test "should get search" do
    get dogs_search_url
    assert_response :success
  end

  test "should get image" do
    get dogs_image_url
    assert_response :success
  end

end
