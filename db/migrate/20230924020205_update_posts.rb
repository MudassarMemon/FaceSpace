class UpdatePosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :feed_id, :bigint, null: false, foreign_key: {to_table: :feed}
  end
end
