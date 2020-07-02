# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe '#create' do
    context 'with non existing email' do
      it 'creates a user' do
        expect do
          post :create, params: { email: 'test-email@example.com', password: 'admin0!' }
        end.to change(User, :count).by(1)
      end

      it 'returns newly created user token' do
        post :create, params: { email: 'test-email@example.com', password: 'admin0!' }

        assert_response 200
        data = JSON.parse(response.body)
        expect(data['auth']).not_to be_empty
      end
    end

    context 'with existing email' do
      let(:email) { 'existing-user@example.com' }

      before(:each) do
        create(:user, email: email)
      end

      it 'does not create a user' do
        expect do
          post :create, params: { email: email, password: 'admin0!' }
          assert_response 400
        end.to change(User, :count).by(0)
      end
    end
  end

  describe '#login' do
    context 'with non existing email' do
      it 'returns an error' do
        post :login, params: { email: 'test-email@example.com', password: 'admin0!' }
        assert_response 400
        data = JSON.parse(response.body)
        expect(data['error']).to eq('No user with such email found')
      end
    end

    context 'with existing email' do
      let(:email) { 'existing-user@example.com' }
      let(:password) { 'uS3r:Pa5s' }

      before(:each) do
        create(:user, email: email, password: password)
      end

      it 'returns auth token if correct password' do
        post :login, params: { email: email, password: password }

        assert_response 200
        data = JSON.parse(response.body)
        expect(data['auth']).not_to be_empty
      end

      it 'returns error token if incorrect password' do
        post :login, params: { email: email, password: 'some-other-password' }

        assert_response 400
        data = JSON.parse(response.body)
        expect(data['error']).to eq('Invalid login')
      end
    end
  end
end
