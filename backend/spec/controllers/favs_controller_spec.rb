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

  describe 'GET #index' do
    let!(:favs) do
      [
        Fav.create(giphy_id: '9fuvOqZ8tbZOU', created_at: Time.now),
        Fav.create(giphy_id: 'ZubZqIeSsZ60t0ID9l', created_at: Time.now + 1.minute),
      ]
    end

    let(:get_favs_request) do
      get :index
    end

    it 'responds with HTTP 200 ok' do
       expect(get_favs_request).to have_http_status(:ok)
    end

    it 'returns the favs as JSON' do
      expect(get_favs_request.body).to eql favs.sort_by(&:created_at).to_json
    end
  end
end
