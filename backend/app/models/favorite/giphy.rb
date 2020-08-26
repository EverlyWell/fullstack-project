module Favorite
  class Giphy < Base
    attribute :thumbnail

    def thumbnail
      Services::Giphy.thumbnail(self.slug)
    end
  end
end
