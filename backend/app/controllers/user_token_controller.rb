class UserTokenController < Knock::AuthTokenController
  protect_from_forgery with: :null_session

end
