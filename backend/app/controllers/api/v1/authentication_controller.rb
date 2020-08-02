class Api::V1::AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  def authenticate
    command = retrieve_jwt

    if command.success?
      render json: { token: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end

  def register
    user = User.create(create_params)

    if (user.save)
      command = retrieve_jwt

      render json: { token: command.result }
    else
      render json: { error: user.errors.full_messages.to_sentence }, status: :bad_request
    end
  end

  private

  def retrieve_jwt
    AuthenticateUser.call(params[:email], params[:password])
  end

  def create_params
    params.permit(:email, :password)
  end
end
