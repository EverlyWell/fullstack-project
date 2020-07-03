# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).with_message('has already been taken') }
  end

  describe 'from_auth_token' do
    let(:user) { create(:user) }

    it 'returns nil on invalid token' do
      token = 'abc.def'
      expect(described_class.from_auth_token(token)).to eq(nil)
    end

    it 'returns nil on user not found' do
      token = JWT.encode({ user_id: 123_456, iss: User::TOKEN_ISSUER }, User::TOKEN_SECRET, 'HS256')
      expect(described_class.from_auth_token(token)).to eq(nil)
    end

    it 'returns the user if token valid' do
      token = user.auth_token
      expect(described_class.from_auth_token(token).id).to eq(user.id)
    end
  end
end
