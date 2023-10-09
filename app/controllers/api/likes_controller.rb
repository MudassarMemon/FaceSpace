class Api::LikesController < ApplicationController
    # wrap_parameters include: Like.attribute_names + ["userId", "likeableId"]
    
    def index
        @likes = Like.all
        render :index
    end

    # likes will be created and destroyed in the posts and controllers respectively
    # def create
    #     @like = Like.new(like_params)

    #     if @like.save
    #         render json: { message: 'success' }
    #     else
    #         render json: { errors: ['unsuccessful'] }, 
    #         status: :unauthorized
    #     end 
    # end

    # def destroy
    #     @like = Like.find_by(like_params)

    #     if @like.destroy
    #         render json: { message: 'success' }
    #     else
    #         render json: { errors: ['unsuccessful'] }, 
    #         status: :unauthorized
    #     end 
    # end

    # private

    # def like_params
    #     params.require[:like].permit(:user_id, :likeable_id)
end
