module Favorite
  class Base < ApplicationRecord
    self.table_name = 'favorites'
  end
end