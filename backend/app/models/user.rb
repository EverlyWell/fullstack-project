class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: { message: 'has already been taken' }

  has_many :favorite_images, dependent: :destroy
end
