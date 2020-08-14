class ApplicationController < ActionController::API
  include Knock::Authenticable
  before_action :authenticate_user
  # undef_method :current_user
end
