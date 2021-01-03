class CreateFavorites < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites do |t|
      t.string :name
      t.string :url
      t.string :giphy_id

      t.timestamps
    end
  end
end
