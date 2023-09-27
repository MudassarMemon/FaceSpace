json.users do
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :email, :first_name, :last_name, :gender, :birthday, :bio, :workplace, :school, :current_city, :hometown, :pronunciation, :created_at, :updated_at
            json.photoUrls user.photos.attached? ? user.photos.map(&:url) : []
        end
    end
end