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
      expect(data).not_to be_empty
    end

    it 'accepts offset param' do
      get :search, params: { q: 'patrick star' }
      page_one_ids = JSON.parse(response.body)['data'].map { |g| g['id'] }
      get :search, params: { q: 'patrick star', offset: 25 }
      page_two_ids = JSON.parse(response.body)['data'].map { |g| g['id'] }

      # array intersection should return false if no overlap
      expect(page_one_ids & page_two_ids).to be_empty
    end
  end
end
