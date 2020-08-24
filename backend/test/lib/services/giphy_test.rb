require 'test_helper'

class Services::GiphyTest < ActiveSupport::TestCase
  test 'giphy search returns results' do
    VCR.use_cassette("giphy_search") do
      giphy_service = Services::Giphy.new
      response = giphy_service.search('kitty')

      first_result = response.data.first

      assert first_result.id.present?
    end
  end

  test 'giphy search result data is translated' do
    expected_attributes = [:thumbnail, :slug, :source]

    VCR.use_cassette("giphy_search") do
      giphy_service = Services::Giphy.new
      giphy_search_response = giphy_service.search('kitty')

      data = Services::Giphy.translate_data(giphy_search_response.data)

      assert expected_attributes.count, (data.first.keys & expected_attributes).count
    end
  end

  test '#thumbnail' do
    assert_equal 'https://media0.giphy.com/media/funny-dude/100.gif', Services::Giphy.thumbnail('funny-dude')
  end
end
