# frozen_string_literal: true

# Main application controller
class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :authenticate_user!

  def current_user
    # Decode token and get user
    # User.find_by(id: )
  end

  def authenticate_user!
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
