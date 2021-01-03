class User < ApplicationRecord
  has_many :favorites
  
  has_secure_password
end
