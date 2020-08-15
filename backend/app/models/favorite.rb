class Favorite < ApplicationRecord
  belongs_to :user

  [:identifier, :url, :user].each do |col|
    validates col, :presence => true
  end

  validates :identifier, uniqueness: { scope: :user_id }
end
