require 'test_helper'

class GiphyFavoriteTest < ActiveSupport::TestCase

  test 'creates Favorite Giphy' do
    favorite_giphy = Favorite::Giphy.new(slug: '138xg52sDwmNIA')
    assert favorite_giphy.save!
  end
end
