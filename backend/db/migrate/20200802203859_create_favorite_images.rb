class CreateFavoriteImages < ActiveRecord::Migration[6.0]
  def change
    create_table :favorite_images do |t|
      t.string :source_id
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
