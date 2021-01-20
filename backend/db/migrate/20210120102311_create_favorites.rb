class CreateFavorites < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites do |t|
      t.integer :breed_id
      t.string :image_url
      t.string :name

      t.timestamps
    end
  end
end
