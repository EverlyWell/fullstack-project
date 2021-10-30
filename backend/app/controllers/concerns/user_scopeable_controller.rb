# User scopeable concern to include request authentication.
module UserScopeableController
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request

    attr_reader :current_user
  end

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: :unauthorized unless @current_user
  end
end
