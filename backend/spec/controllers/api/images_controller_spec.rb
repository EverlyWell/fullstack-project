# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::ImagesController, type: :controller do
  describe '#search' do
    let(:user) { create(:user) }
    let(:image) { create(:favorite_image, user: user) }
    let(:payload) do
      [
        { source_id: 'abc' },
        { source_id: image.source_id }
      ]
    end

    before(:each) do
      allow(controller).to receive(:current_user).and_return(user)

      image_client = double
      allow(ImageClient).to receive(:new).and_return(image_client)
      allow(image_client).to receive(:search).and_return(payload)
    end

    it 'does not mark image as favorite if record does not exist' do
      get :search

      image = JSON.parse(response.body).first
      expect(image['favorite']).to eq(nil)
    end

    it 'marks image as favorite if record exists' do
      get :search

      image = JSON.parse(response.body).last
      expect(image['favorite']).to eq(true)
    end
  end
end
