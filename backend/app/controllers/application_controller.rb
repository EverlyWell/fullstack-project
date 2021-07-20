class ApplicationController < ActionController::Base
  protect_from_forgery prepend: true

  def jwt_secret
    ENV['JWT_SECRET_KEY']
  end
  
  def encode_token(payload)
    JWT.encode(payload, jwt_secret)
  end

  def decoded_token
    auth_header = request.headers['Authorization'].delete('\"')
    token = auth_header.split(' ').last if auth_header
      # header: { 'Authorization': 'Bearer <token>' }
    begin
      JWT.decode(token, jwt_secret, verify = false)
    rescue JWT::DecodeError
      nil
    end
  end

  def user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end
end
