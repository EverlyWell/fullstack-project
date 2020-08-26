class AddUserToFavorites < ActiveRecord::Migration[6.0]
  def change
    add_reference :favorites, :user, foreign_key: true
  end
end
