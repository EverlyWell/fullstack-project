require 'test_helper'

class GiphyFavoriteTest < ActiveSupport::TestCase

  test 'creates Favorite Giphy' do
    favorite_giphy = Favorite::Giphy.new(slug: '138xg52sDwmNIA')
    assert favorite_giphy.save!
  end

  test 'Favorite Giphy returns a thumbnail' do
    favorite_giphy = Favorite::Giphy.create(slug: '138xg52sDwmNIA')
    assert favorite_giphy.thumbnail.include?('media0.giphy.com/media/138xg52sDwmNIA/')
  end

  test 'Favorite Giphy returns a source' do
    favorite_giphy = Favorite::Giphy.create(slug: '138xg52sDwmNIA')
    assert 'Favorite::Giphy', favorite_giphy.source
  end
end
