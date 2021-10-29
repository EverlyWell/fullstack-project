require 'spec_helper'

describe JsonWebToken do
  let(:password) { Faker::Internet.password }
  let(:user) { create(:user, password: password, password_confirmation: password) }

  describe '.encode' do
    subject { JsonWebToken.encode(user_id: user.id) }
    let(:claims) { JWT.decode(subject, Rails.application.secrets.secret_key_base)[0] }

    it 'returns the token' do
      expect(subject).not_to be_empty
      expect(claims['user_id']).to eq(user.id)
    end
  end

  describe '.decode' do
    let(:token) { JWT.encode({user_id: user.id}, Rails.application.secrets.secret_key_base) }
    subject { JsonWebToken.decode(token) }

    it 'returns the payload' do
      expect(subject).not_to be_empty
      expect(subject).to match({ user_id: user.id })
    end
  end
end
