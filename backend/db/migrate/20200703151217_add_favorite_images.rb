class AddFavoriteImages < ActiveRecord::Migration[6.0]
  def change
    create_table :favorite_images do |t|
      t.string :source_id, null: false
      t.integer :user_id
      t.string :url
      t.string :origin_url

      t.timestamps null: false
    end

    add_index :favorite_images, %i[user_id source_id], unique: true
  end
end
