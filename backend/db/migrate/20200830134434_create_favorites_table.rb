class CreateFavoritesTable < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites do |t|
      t.string :user_id
      t.string :photo_id
      t.string :photo_url
      t.timestamps
    end
  end
end
