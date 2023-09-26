class UpdateUsersBio < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :workplace, :string, null: true
    add_column :users, :hometown, :string, null: true
    add_column :users, :current_city, :string, null: true
    add_column :users, :school, :string, null: true
    add_column :users, :pronunciation, :string, null: true
  end
end
