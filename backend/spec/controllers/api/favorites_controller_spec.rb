require 'rails_helper'

describe Api::FavoritesController, type: :controller do
  describe 'Get favorites' do
    it 'returns the favorites' do
      favorite = Favorite.create(giphy_id: '123')
      get :index
      expect(assigns(:favorites)).to eq [favorite]
    end
  end
  
  describe 'Create favorite' do
    it 'creates the favorite' do
      post :create, params: { favorite: { giphy_id: '456' } }
      expect(response.status).to eq(200)
      expect(Favorite.first.giphy_id).to eq '456'
    end
  end
end
