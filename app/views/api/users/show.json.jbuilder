json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :gender, :birthday, :bio, :created_at, :updated_at
end

posts = @user.posts

json.posts do
    posts.each do |post|
        json.set! post.id do
            json.extract! post, :id, :body, :author_id, :feed_id, :created_at
        end
    end
end