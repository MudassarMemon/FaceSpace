class UpdateUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :profile_pic_url, :string, null: true
    add_column :users, :cover_pic_url, :string, null: true
  end
end
