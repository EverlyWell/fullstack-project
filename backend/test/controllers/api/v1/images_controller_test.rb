require 'test_helper'

class ImagesControllerTest < ActionDispatch::IntegrationTest
  test 'search giphy' do
    expected_attributes = ['slug', 'source', 'thumbnail']
    Services::Giphy.any_instance.stubs(:search).returns(OpenStruct.new({data: [OpenStruct.new({ id: 'test' })]}))

    get '/api/v1/images/search.json?query=kitty'

    result = JSON.parse(response.body)
    assert expected_attributes.count, (result['data'].first.keys & expected_attributes).count
    assert expected_attributes.count, result['data'].first.values.compact.count

    assert_response :success
  end

  test 'search giphy returns favorite flag' do
    favorited_slug = 'abc123'

    Favorite::Giphy.create(slug: favorited_slug)
    Services::Giphy.any_instance.stubs(:search).returns(OpenStruct.new({data: [OpenStruct.new({ id: favorited_slug })]}))

    get '/api/v1/images/search.json?query=kitty'

    result = JSON.parse(response.body)
    assert result['data'].first['isFavorite']
    assert_equal favorited_slug, result['data'].first['slug']

    assert_response :success
  end


  test 'search the cat api is not implemented' do
    assert_raise ArgumentError do
      get '/api/v1/images/search.json?query=kitty&source=TheCatAPI'
    end
  end
end
