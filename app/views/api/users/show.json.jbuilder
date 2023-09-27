json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :gender, :birthday, :bio, :profile_pic_url, :cover_pic_url, :workplace, :school, :current_city, :hometown, :pronunciation, :created_at, :updated_at
    json.photoUrls @user.photos.attached? ? @user.photos.map(&:url) : []
  
    json.posts @user.posts.includes(:comments) do |post|

      json.set! post.id do
        json.extract! post, :id, :body, :author_id, :feed_id, :created_at, :updated_at
        json.photoUrl post.photo.attached? ? post.photo.url : nil
      end

      json.comments post.comments do |comment|
        # json.set! comment.id do
          json.extract! comment, :id, :body, :author_id, :post_id, :created_at, :updated_at
        # end
      end
    end
  end
  