require 'test_helper'

class GiphyFavoriteTest < ActiveSupport::TestCase
  setup do
    @user = User.create(email: Faker::Internet.email, password: 'testpass')
    
    @favorite_giphy = Favorite::Giphy.new(slug: '138xg52sDwmNIA', user: @user)
  end

  test 'creates Favorite Giphy' do
    favorite_giphy = Favorite::Giphy.new(slug: '138xg52sDwmNIA', user: @user)
    assert favorite_giphy.save!
  end

  test 'Favorite Giphy returns a thumbnail' do
    assert @favorite_giphy.thumbnail.include?('media0.giphy.com/media/138xg52sDwmNIA/')
  end

  test 'Favorite Giphy returns a source' do
    assert 'Favorite::Giphy', @favorite_giphy.source
  end

  test 'Favorite is associated to User' do
    expected_slug = Faker::Internet.slug
    
    @user.favorites << Favorite::Giphy.create(slug: expected_slug)

    assert_equal @user, Favorite::Base.find_by(slug: expected_slug).user
  end
end
