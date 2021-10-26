module Api::V1
  class UsersController < ApplicationController
    def create
      @user = User.new(user_params)

      if !!@user && @user.authenticate(params[:password])
        session[:user_id] = @user.id
        return
      else

      end
    end

    private

    def user_params
      params.require(:user).permit(:username, :password)
    end
  end
end
