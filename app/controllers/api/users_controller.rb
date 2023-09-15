class Api::UsersController < ApplicationController
  before_action :require_logged_out, only: [:create]
  wrap_parameters include: User.attribute_names + ['password']

  def index
    @users = User.all
    render 'api/users/index'
  end

  def show
    @user = User.find_by(id: params[:id])
    render 'api/users/show'
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render 'api/users/show'
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find_by(id: params[:id])

    if @user == current_user && @user.update(user_params)
      render 'api/users/show'
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private 

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :gender, :birthday, :password, :bio)
  end

end
