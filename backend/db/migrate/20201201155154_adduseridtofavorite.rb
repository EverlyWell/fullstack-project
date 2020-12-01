class Adduseridtofavorite < ActiveRecord::Migration[6.0]
  def change
    add_column :favorites, :user_id, :integet
  end
end
