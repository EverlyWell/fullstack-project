# frozen_string_literal: true

# Store each user login
class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true,
                    uniqueness: { message: 'has already been taken' }
end
