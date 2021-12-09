require 'test_helper'

describe Api::FavsController, type: :controller do
  render_views

  describe 'POST #create' do
    let(:params) do
      {
        giphy_id: 1
      }
    end

    let(:create_fav_request) do
      post :create, params: params
    end

    it 'responds with HTTP 200 Ok' do
       expect(create_fav_request).to have_http_status(:ok)
    end

    it 'creates a fav' do
      expect{ create_fav_request }.to change { Fav.count }.by(1)
    end
  end
end
