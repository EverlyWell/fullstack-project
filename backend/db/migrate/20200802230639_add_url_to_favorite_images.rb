class AddUrlToFavoriteImages < ActiveRecord::Migration[6.0]
  def change
    add_column :favorite_images, :url, :string
  end
end
