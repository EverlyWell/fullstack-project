module Favorite
  class Base < ApplicationRecord
    self.table_name = 'favorites'

    attribute :source

    def source
      self.type.gsub('Favorite::','')
    end
  end
end