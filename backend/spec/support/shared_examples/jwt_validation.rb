RSpec.shared_examples 'JWT validation' do
  subject(:response_body) { JSON.parse(response.body) }

  context 'when the JWT is valid' do
    context 'when the user exists' do
      it 'success', vcr: { record: :once }  do
        expect(response).to have_http_status(:ok)
      end
    end

    context "when the user doesn't exist" do
      let(:payload) do
        {
          user_id: -1
        }
      end

      it 'returns a json error', vcr: { record: :once }  do
        expect(response).to have_http_status(:unauthorized)
        expect(response_body).to include('error' => 'Not Authorized')
      end
    end
  end

  describe 'JWT Decoding errors' do
    context 'bad token encoding ' do
      let(:auth_headers) { { "Authorization" => "Breakfast at Shoneys" } }

      it 'returns a json error', vcr: { record: :once }  do
        expect(response).to have_http_status(:unauthorized)
        expect(response_body).to include('error' => 'Not Authorized')
      end
    end

    context 'empty string given' do
      let(:auth_headers) { { "Authorization" => "" } }

      it 'returns a json error', vcr: { record: :once }  do
        expect(response).to have_http_status(:unauthorized)
        expect(response_body).to include('error' => 'Not Authorized')
      end
    end

    context 'no authorization header' do
      let(:auth_headers) { { } }

      it 'returns a json error', vcr: { record: :once }  do
        expect(response).to have_http_status(:unauthorized)
        expect(response_body).to include('error' => 'Not Authorized')
      end
    end
  end
end
