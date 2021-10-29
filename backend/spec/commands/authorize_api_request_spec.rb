require 'spec_helper'

describe AuthorizeApiRequest do
  let(:password) { Faker::Internet.password }
  let(:command) { AuthorizeApiRequest.new(headers) }
  let(:email) { user.email }
  let(:authenticate_user) { AuthenticateUser.new(email, password) }
  let(:headers) do
    {
      'Authorization' => authenticate_user.call.result
    }
  end

  describe 'success' do
    let(:user) { create(:user, password: password, password_confirmation: password) }

    it 'returns the user' do
      expect(command.call.result).to eq(user)
    end
  end

  describe 'fails' do
    context "when the password doesn't match" do
      let(:password2) { Faker::Internet.password }
      let(:user) { create(:user, password: password2, password_confirmation: password2) }

      it 'returns nil' do
        expect(command.call.result).to be_nil
      end
    end

    context "when the user doesn't exist" do
      let(:email) { Faker::Internet.email }

      it 'returns nil' do
        expect(command.call.result).to be_nil
      end
    end
  end
end

