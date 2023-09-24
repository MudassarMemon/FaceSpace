class UpdatePosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :feed_id, :integer, foreign_key: {to_table: :feed}, index: true, null: false
  end
end
