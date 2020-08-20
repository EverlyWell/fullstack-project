require 'rails_helper'

RSpec.describe Api::GiphyController do
  describe 'GET search' do
    it 'renders' do
      get :search
      expect(response.status).to be(200)
    end

    it 'returns giphy data hash' do
      get :search, params: { q: 'spongebob' }
      data = JSON.parse(response.body)['data']
      puts data
      expect(data).not_to be_empty
    end
  end
end
