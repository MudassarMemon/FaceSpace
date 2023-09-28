class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + [ 'avatar', 'cover', 'password', 'firstName', 'lastName', 'currentCity']

  def index
    @users = User.all
    render 'api/users/index'
  end

  def show
    @user = User.find_by(id: params[:id])

    render 'api/users/show'
  end

  def search
    query = params[:query]
    @users = User.where('first_name ILIKE ? OR last_name ILIKE ?', "%#{query}%", "%#{query}%").limit(8)
    render :search    
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
    @user = User.find_by(id:params[:id])
    
    if  @user.update(user_params)
      render 'api/users/show'
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private 

  def user_params
    params.require(:user).permit(:id, :avatar, :cover, :email, :first_name, :last_name, :gender, :birthday, :password, :bio, :workplace, :school, :current_city, :hometown, :pronunciation)
  end

end
