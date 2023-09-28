json.users do
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :email, :first_name, :last_name, :gender, :birthday, :bio, :workplace, :school, :current_city, :hometown, :pronunciation, :created_at, :updated_at
            json.photoUrls user.photos.attached? ? user.photos.map(&:url) : ["https://facespace-fs-seeds.s3.amazonaws.com/cover_photo_default.jpg","https://facespace-fs-seeds.s3.amazonaws.com/profile_pic_default.jpg"]
        end
    end
end