RSpec.shared_examples 'API pagination' do
  subject(:response_body) { JSON.parse(response.body) }

  it 'returns the expected paginated collection', vcr: { record: :once } do
    expect(response).to have_http_status(:ok)

    expect(response_body).to include(
      'pagination' => hash_including('count', 'page', 'limit')
    )
  end
end
