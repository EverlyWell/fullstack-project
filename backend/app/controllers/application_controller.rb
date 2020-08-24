require "application_responder"

class ApplicationController < ActionController::Base
  # Making use of responders, for more details: https://github.com/heartcombo/responders
  self.responder = ApplicationResponder

  # Allowing json responses for use with the 'respond_with' method
  respond_to :json

  protect_from_forgery with: :null_session # ToDo: implement alternate security / authentication
end
