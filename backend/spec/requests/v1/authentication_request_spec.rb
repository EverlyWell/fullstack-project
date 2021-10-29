require 'rails_helper'

RSpec.describe 'Authentication', type: :request do
  subject(:response_body) { JSON.parse(response.body) }

  describe 'POST /api/v1/authentication/signing' do
    let(:password) { Faker::Internet.password }
    let(:email) { user.email }

    let(:params) do
      {
        email: email,
        password: password
      }
    end

    before do
      post '/api/v1/authentication/signin', params: params
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

  describe 'POST /api/v1/authentication/signup' do
    let(:password) { Faker::Internet.password }
    let(:password_confirmation) { password }
    let(:email) { Faker::Internet.email }

    let(:params) do
      {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    end

    before do
      post '/api/v1/authentication/signup', params: params
    end

    context 'success' do
      it 'returns the auth_token' do
        expect(response).to have_http_status(:ok)
        expect(response_body).to have_key('auth_token')
        # more token claim tests can be added in the future
        expect(response_body['auth_token']).not_to be_empty
      end
    end

    context 'fails' do
      context "passwords don't match" do
        let(:password_confirmation) { Faker::Internet.password }

        it 'returns errors' do
            expect(response).to have_http_status(:unprocessable_entity)
          expect(response_body).to have_key('error')
          expect(response_body['error']).to include({'user_creation' => "Error when creating the user"})
        end
      end
    end
  end
end
