module Api
  module V1
    # Authentication controller
    class AuthenticationController < ApplicationController
      include ::UserScopeableController

      skip_before_action :authenticate_request

      def signin
        command = AuthenticateUser.call(auth_params[:email], auth_params[:password])

        if command.success?
          render json: { auth_token: command.result }
        else
          render json: { error: command.errors }, status: :unauthorized
        end
      end

      def signup
        # creates the user
        user = User.new(auth_params)
        unless user.save
          return render json: { error: { 'user_creation' => 'Error when creating the user' } }, status: :unprocessable_entity
        end

        # and authenticate user
        command = AuthenticateUser.call(auth_params[:email], auth_params[:password])
        if command.success?
          render json: { auth_token: command.result }
        else
          render json: { error: command.errors }, status: :unauthorized
        end
      end

      private

      def auth_params
        params.permit(:email, :password, :password_confirmation)
      end
    end
  end
end
