class Favorite < ApplicationRecord
    validates :title, presence: true
    validates :giphy_id, presence: true, uniqueness: true
    validates :url, presence: true
end
