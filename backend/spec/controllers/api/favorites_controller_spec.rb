# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::FavoritesController, type: :controller do
  let(:user) { create(:user) }

  before(:each) do
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe '#index' do
    let!(:user_image) { create(:favorite_image, user: user) }

    before(:each) do
      create(:favorite_image, :with_user)
    end

    it 'returns user favorite images' do
      get :index

      data = JSON.parse(response.body)
      expect(data.length).to eq(1)
    end

    it 'returns image id' do
      get :index

      data = JSON.parse(response.body)
      expect(data[0]['id']).to eq(user_image.id)
    end

    it 'marks returned image as favorite' do
      get :index

      data = JSON.parse(response.body)
      expect(data[0]['favorite']).to eq(true)
    end
  end

  describe '#create' do
    let(:image_args) { attributes_for(:favorite_image) }

    context 'with non favorited image' do
      it 'creates a favorite image record' do
        expect do
          post :create, params: { image: image_args }
        end.to change(FavoriteImage, :count).by(1)
      end

      it 'returns newly created user token' do
        post :create, params: { image: image_args }

        assert_response 200
        image = FavoriteImage.last
        expect(image.user_id).to eq(user.id)
      end
    end

    context 'with image already favorited' do
      before(:each) do
        create(:favorite_image, user: user, source_id: image_args[:source_id])
      end

      it 'does not create a user' do
        expect do
          post :create, params: { image: image_args }
          assert_response 400
        end.to change(FavoriteImage, :count).by(0)
      end
    end
  end

  describe '#destroy' do
    context 'with favorited image' do
      let!(:image) { create(:favorite_image, user: user) }

      it 'removes image' do
        expect do
          delete :destroy, params: { id: image.id }
          assert_response 200
        end.to change(FavoriteImage, :count).by(-1)
      end
    end

    context 'with favorited image from another user' do
      let!(:image) { create(:favorite_image, :with_user) }

      it 'removes image' do
        expect do
          delete :destroy, params: { id: image.id }
          assert_response 404
        end.not_to change(FavoriteImage, :count)
      end
    end
  end
end
