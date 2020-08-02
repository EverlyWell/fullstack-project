class FavoriteImage < ApplicationRecord
  belongs_to :user

  validates :source_id, presence: true, uniqueness: { scope: :user_id, message: 'already exists for this user' }

  scope :with_source_id, lambda {|id| where('source_id = ?', id) }
end
