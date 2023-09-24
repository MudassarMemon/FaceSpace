class UpdatePosts2 < ActiveRecord::Migration[7.0]
  def change
    add_index :posts, :feed_id
  end
end
