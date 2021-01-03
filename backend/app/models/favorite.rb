class Favorite < ApplicationRecord
  belongs_to :user
  
  validates_uniqueness_of :giphy_id
end
