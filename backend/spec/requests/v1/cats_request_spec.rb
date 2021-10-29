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
  end
end
