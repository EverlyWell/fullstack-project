require 'rails_helper'

RSpec.describe Api::GiphyController do
  describe 'GET search' do
    it 'renders' do
      get :search
      expect(response.status).to be(200)
    end
  end
end
