RSpec.shared_context 'authenticated request', shared_context: :authenticated_request do
  let(:password) { Faker::Internet.password }
  let(:user) { create(:user, password: password, password_confirmation: password) }
  let(:payload) do
    {
      user_id: user.id
    }
  end
  let(:jwt) { JsonWebToken.encode(payload)  }
  let(:auth_headers) { { "Authorization" => jwt } }
end
