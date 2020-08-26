module Favorite
  class Base < ApplicationRecord
    self.table_name = 'favorites'
    belongs_to :user

    attribute :source

    def source
      self.type.gsub('Favorite::','')
    end
  end
end
