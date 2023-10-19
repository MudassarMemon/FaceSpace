json.users do
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :email, :first_name, :last_name, :gender, :birthday, :bio, :workplace, :school, :current_city, :hometown, :pronunciation, :created_at, :updated_at
            json.coverUrl user.cover.attached? ? user.cover.url : "https://facespace-fs-seeds.s3.amazonaws.com/cover_photo_default.jpg"
            json.avatarUrl user.avatar.attached? ? user.avatar.url : "https://facespace-fs-seeds.s3.amazonaws.com/profile_pic_default.jpg"
            json.friends user.friends do |friend|
            json.extract! friend, :id, :user_id, :friend_id, :status
            end
            
            json.friendRequests user.friend_requests do |friendRequest|
            json.extract! friendRequest, :id, :user_id, :friend_id, :status
            end
        end
    end
end