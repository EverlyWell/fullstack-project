require 'spec_helper'

describe AuthenticateUser do
  let(:email) { user.email }
  let(:password) { Faker::Internet.password }
  let(:command) { AuthenticateUser.new(email, password) }

  describe 'success' do
    let(:password) { Faker::Internet.password }
    let(:user) { create(:user, password: password, password_confirmation: password) }

    it 'returns the token' do
      # more token claim tests can be added in the future
      expect(command.call.result).not_to be_empty
    end
  end

  describe 'fails' do
    context "when the password doesn't match" do
      let(:password2) { Faker::Internet.password }
      let(:user) { create(:user, password: password2, password_confirmation: password2) }

      it 'returns errors' do
        expect(command.call.errors).to include({user_authentication: ["invalid credentials"]})
      end
    end

    context "when the user doesn't exist" do
      let(:email) { Faker::Internet.email }

      it 'returns errors' do
        expect(command.call.errors).to include({user_authentication: ["invalid credentials"]})
      end
    end
  end
end
