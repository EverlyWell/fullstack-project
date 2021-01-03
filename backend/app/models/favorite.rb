class Favorite < ApplicationRecord
  validates_uniqueness_of :giphy_id
end
