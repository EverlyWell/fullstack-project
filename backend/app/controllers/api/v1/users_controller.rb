class Api::V1::UsersController < ApplicationController
  before_action :authenticated, only: :authenticate
  
  def create
    @user = User.create(user_params)

    if @user.valid?
      render json: { token: token(@user) }
    else
      render json: { error: "Invalid username or password" }
    end
  end

  def login
    @user = User.find_by(username: user_params[:username]) 
    
    if @user && @user.authenticate(user_params[:password])
      render json: { token: token(@user) }
    else
      render json: { error: "Invalid username or password" }
    end
  end

  def authenticate
    render json: @user
  end

  
  private

  def token(user)
    encode_token({ user_id: user.id })
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end

end