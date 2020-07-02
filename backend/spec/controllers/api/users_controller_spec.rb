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
end
