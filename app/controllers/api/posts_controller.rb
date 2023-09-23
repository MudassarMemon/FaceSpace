class Api::PostsController < ApplicationController
    wrap_parameters include: Post.attribute_names + ["authorId"]

    def create
        @post = Post.new(post_params)

        if @post.save
            render 'api/posts/show'
        end
    end

    private
    def post_params
        params.require(:post).permit(:author_id, :body)
    end
end
