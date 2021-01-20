class Favorite < ApplicationRecord
  validates :name, presence: true
  validates :image_url, presence: true
  validates :breed_id, presence: true
end
