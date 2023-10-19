class Api::FriendsController < ApplicationController
    wrap_parameters include: Friend.attribute_names + ["userId", "friendId"]

    def create
        @friend = Friend.create(friend_params)
        render "api/friends/show"
    end

    def update
        @friend = Friend.find_by(id: params[:id])

        @friend.update(friend_params)
        render "api/friends/show"
    end

    def destroy
        @friend = Friend.find_by(id: params[:id])

        @friend.destroy
        render json: { message: 'success' }
    end

    private

    def friend_params
        params.require(:friends).permit(:user_id, :friend_id, :status)
    end

end
