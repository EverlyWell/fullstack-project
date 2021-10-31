require 'rails_helper'

RSpec.describe 'Categories', type: :request do
  include_context 'authenticated request'

  subject(:response_body) { JSON.parse(response.body) }

  describe 'GET /api/v1/categories' do
    let(:params) { {} }

    before do
      get api_v1_categories_path, params: params, headers: auth_headers
    end

    it_behaves_like 'JWT validation'

    context 'success' do
      it 'returns the categories', vcr: { record: :once } do
        expect(response).to have_http_status(:ok)
        expect(response_body).not_to be_empty
      end
    end
  end
end
