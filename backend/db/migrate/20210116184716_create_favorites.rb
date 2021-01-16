class CreateFavorites < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites do |t|
      t.string :giphy_id
      t.string :title
      t.string :url

      t.timestamps
    end
  end
end
