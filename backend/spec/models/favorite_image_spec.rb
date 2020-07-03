# frozen_string_literal: true

require 'rails_helper'

RSpec.describe FavoriteImage, type: :model do
  let(:user) { create(:user) }

  describe 'validations' do
    it { is_expected.to validate_presence_of(:source_id) }
    it do
      FactoryBot.create(:favorite_image, user: user)

      expect(described_class.new).to validate_uniqueness_of(:source_id)
        .scoped_to(:user_id)
        .with_message('already exists for this user')
    end
  end

  describe '#hash_for_source_ids' do
    let!(:image1) { create(:favorite_image, user: user) }
    let!(:image2) { create(:favorite_image, user: user) }

    it 'returns hash with user favorited image with source_ids' do
      source_ids = [image1.source_id]
      hash = described_class.hash_for_source_ids(user, source_ids)

      expect(hash[image1.source_id]).to eq(image1.id)
    end

    it 'does not include non existent source_id' do
      source_id = 'abc-def'
      hash = described_class.hash_for_source_ids(user, [source_id])

      expect(hash[source_id]).to eq(nil)
    end

    it 'does not include favorites if source_id not in the requested list' do
      source_ids = [image1.source_id]
      hash = described_class.hash_for_source_ids(user, source_ids)

      expect(hash[image2.source_id]).to eq(nil)
    end
  end
end
