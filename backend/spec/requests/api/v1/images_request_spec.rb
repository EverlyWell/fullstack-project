require 'rails_helper'

RSpec.describe 'Api::V1::ImagesController', type: :request do
  describe 'GET index' do
    subject { get '/api/v1/images' }

    it 'returns a 200' do
      subject
      expect(response).to have_http_status(:ok)
    end
  end
end
