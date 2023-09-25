# == Schema Information
#
# Table name: posts
#
#  id         :bigint           not null, primary key
#  author_id  :bigint           not null
#  feed_id    :bigint           not null
#  body       :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Post < ApplicationRecord
    validates :body, :author_id, presence: true
    
    belongs_to :user_feed,
        foreign_key: :feed_id,
        class_name: :User

    belongs_to :author,
        foreign_key: :author_id,
        class_name: :User
end
