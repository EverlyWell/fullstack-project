class CreateFavs < ActiveRecord::Migration[6.0]
  def change
    create_table :favs do |t|
      t.string :giphy_id

      t.timestamps
    end
  end
end
