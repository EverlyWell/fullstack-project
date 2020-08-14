class User < ApplicationRecord
  has_secure_password

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  alias_method :authenticate, :valid_password?
  has_many :favorites
end
