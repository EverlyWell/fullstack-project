require 'rails_helper'

RSpec.describe 'Authentication', type: :request do
  subject(:response_body) { JSON.parse(response.body) }

  describe 'POST /api/v1/authenticate' do
    let(:password) { Faker::Internet.password }
    let(:email) { user.email }

    let(:params) do
      {
        email: email,
        password: password
      }
    end

    before do
      post api_v1_authenticate_path, params: params
    end

    context 'success' do
      let(:user) { create(:user, password: password, password_confirmation: password) }

      it 'returns the auth_token' do
        expect(response).to have_http_status(:ok)
        expect(response_body).to have_key('auth_token')
        # more token claim tests can be added in the future
        expect(response_body['auth_token']).not_to be_empty
      end
    end

    context 'fails' do
      let(:password2) { Faker::Internet.password }
      let(:user) { create(:user, password: password2, password_confirmation: password2) }

      it 'returns errors' do
        expect(response).to have_http_status(:unauthorized)
        expect(response_body).to have_key('error')
        expect(response_body['error']).to include({'user_authentication' => "invalid credentials"})
      end
    end
  end
end
