class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :authenticated

  def encode_token(payload)
    JWT.encode(payload, 'yourSecret')
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      JWT.decode(token, 'yourSecret', true, algorithm: 'HS256')
    end
  end

  def logged_in_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authenticated
    render json: :nothing, status: :unauthorized unless logged_in?
  end
end
