require 'rails_helper'

RSpec.describe 'Cats', type: :request do
  include_context 'authenticated request'

  subject(:response_body) { JSON.parse(response.body) }

  describe 'GET /api/v1/cats' do
    let(:params) { {} }

    before do
      get api_v1_cats_path, params: params, headers: auth_headers
    end

    it_behaves_like 'JWT validation'

    it_behaves_like 'API pagination'

    context 'success' do
      it 'returns the cats', vcr: { record: :once } do
        expect(response).to have_http_status(:ok)
        expect(response_body).to include('cats', 'pagination')
      end
    end
  end
end
