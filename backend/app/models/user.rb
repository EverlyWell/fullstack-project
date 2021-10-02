class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :cat_api_sub_id, presence: true, uniqueness: true
    validates :password,
              length: { minimum: 6 },
              if: -> { new_record? || !password.nil? }
end
