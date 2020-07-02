# frozen_string_literal: true

# Store each user login
class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true,
                    uniqueness: { message: 'has already been taken' }

  TOKEN_ISSUER = 'AwesomeServer'
  TOKEN_SECRET = ENV.fetch('JWT_KEY', '')

  def auth_token
    JWT.encode({ user_id: id, iss: TOKEN_ISSUER }, TOKEN_SECRET, 'HS256')
  end
end
