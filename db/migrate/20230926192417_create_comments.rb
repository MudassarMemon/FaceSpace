class CreateComments < ActiveRecord::Migration[7.0]
  def change
    create_table :comments do |t|
      t.references :author, null: false, foreign_key: { to_table: :users, on_delete: :cascade }
      t.references :post, null: false, foreign_key: { on_delete: :cascade }
      t.text :body, null:false
      t.timestamps
    end
  end
end
