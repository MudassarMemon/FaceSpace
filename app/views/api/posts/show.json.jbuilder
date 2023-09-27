json.post do
    json.extract! @post, :id, :author_id, :feed_id, :body, :created_at, :updated_at
    json.photoUrl @post.photo.attached? ? @post.photo.url : nil
end
