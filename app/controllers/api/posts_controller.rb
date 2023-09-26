class Api::PostsController < ApplicationController
    wrap_parameters include: Post.attribute_names + ["authorId", "feedId"]

    def create
        @post = Post.new(post_params)

        if @post.save
            render 'api/posts/show'
        end
    end

    def update
        @post = Post.find_by(id: params[:id])

        if params[:author_id] == current_user.id && @post.update(post_params)
            render 'api/posts/show'
        end
    end

    def destroy
        @post = Post.find_by(id: params[:id])

        if @post.author_id == current_user.id || @post.feed_id == current_user.id
            @post.destroy
            render json: { message: 'success' }
        else
            render json: { errors: ['You cannot delete this post'] }, 
            status: :unauthorized
        end 
    end

    private
    def post_params
        params.require(:post).permit(:author_id, :body, :feed_id)
    end
end
