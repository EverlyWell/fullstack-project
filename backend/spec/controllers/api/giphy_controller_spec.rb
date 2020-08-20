require 'rails_helper'

RSpec.describe Api::GiphyController do
  describe 'GET search' do
    it 'renders' do
      get :search
      expect(response.status).to be(200)
    end

    it 'returns array' do
      get :search
      expect(response.body).to eq('[]')
    end
  end
end
