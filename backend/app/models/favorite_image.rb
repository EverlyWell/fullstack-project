# frozen_string_literal: true

# Store user's favorite
class FavoriteImage < ApplicationRecord
  belongs_to :user

  validates :source_id, presence: true,
                        uniqueness: { scope: :user_id, message: 'already exists for this user' }

  # Find favorited images matching source_ids and store them in hash for easy look-up
  #  return: { 'source-id-1' => id, 'source-id-2' => id }
  def self.hash_for_source_ids(user, source_ids)
    images = user.favorite_images.where(source_id: source_ids).pluck(:source_id, :id)
    Hash[images]
  end

  def json_data
    data = as_json(only: %i[id source_id url origin_url])
    data[:favorite] = true
    data
  end
end
