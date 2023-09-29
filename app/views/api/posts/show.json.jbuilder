json.post do
    json.extract! @post, :id, :author_id, :feed_id, :body, :created_at, :updated_at
    json.photoUrl @post.photo.attached? ? @post.photo.url : nil
end

# comments = @post.comments

# json.comments do 
#     json.set! @post_id
#         comments.each do |comment|
#             json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
#         end
#     end
# end