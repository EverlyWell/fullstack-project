require 'rails_helper'

RSpec.describe 'Favorites', type: :request do
  include_context 'authenticated request'

  subject(:response_body) { JSON.parse(response.body) }

  describe 'GET /api/v1/favorites' do
    let(:params) { {} }

    before do
      get api_v1_favorites_path, params: params, headers: auth_headers
    end

    it_behaves_like 'JWT validation'

    it_behaves_like 'API pagination'

    context 'success' do
      it 'returns the favs', vcr: { record: :once } do
        expect(response).to have_http_status(:ok)
        expect(response_body).to include('favs', 'pagination')
      end
    end
  end

  describe 'POST /api/v1/favorites' do
    let(:params) do
      {
        'image_id' => '1',
        'sub_id' => 'example@gmail.com'
      }
    end

    before do
      post api_v1_favorites_path, params: params, headers: auth_headers
    end

    it_behaves_like 'JWT validation'

    context 'success' do
      it 'returns the fav id', vcr: { record: :once } do
        expect(response).to have_http_status(:ok)
        expect(response_body).to include('message', 'id')
        expect(response_body).to include('message' => 'SUCCESS')
      end
    end
  end

  describe 'DELETE /api/v1/favorites' do
    let(:id) { '2102473' }

    let(:params) do
      {
        id: id
      }
    end

    before do
      delete api_v1_favorite_path(id), params: params, headers: auth_headers
    end

    context 'success' do
      it 'returns message success', vcr: { record: :once } do
        expect(response).to have_http_status(:ok)
        expect(response_body).to include('message' => 'SUCCESS')
      end
    end
  end
end
