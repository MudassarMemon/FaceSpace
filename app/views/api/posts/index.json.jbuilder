json.posts @posts.each do |post|
   
    json.set! post.id do
        json.extract! post, :id, :author_id, :feed_id, :body, :created_at, :updated_at
        json.photoUrl post.photo.attached? ? post.photo.url : nil
        json.likes post.likes
    end

    json.comments post.comments do |comment|
        json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
        json.likes comment.likes 
    end

end
