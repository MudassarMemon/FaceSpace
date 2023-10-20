class Api::FriendsController < ApplicationController
    wrap_parameters include: Friend.attribute_names + ["userId", "friendId"]

    def create
        @friend = Friend.create(friend_params)
        @users = User.all
        render "api/users/index"
    end

    def update
        @friend = Friend.find_by(id: params[:id])

        @friend.update(status: true)
        @users = User.all

        render "api/users/index"
    end

    def destroy
        @friend = Friend.find_by(id: params[:id])

        @friend.destroy
        @users = User.all

        render "api/users/index"
    end

    private

    def friend_params
        params.require(:friend).permit(:user_id, :friend_id, :status)
    end

end
