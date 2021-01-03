class AddUserIdToFavorites < ActiveRecord::Migration[6.0]
  def change
    add_column :favorites, :user_id, :integer

    add_index :favorites, :giphy_id
    add_index :favorites, :user_id
  end
end
