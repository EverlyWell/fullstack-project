class CreateFavorites < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites do |t|
      t.string :giphy_id
      t.timestamps

      t.index :giphy_id
    end
  end
end
