class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist

  has_many :favorites, class_name: 'Favorite::Base'
end
