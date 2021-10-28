class HealthController < ApplicationController
  PING_RESPONSE = {
    data: {
      id:         nil,
      type:       'ping',
      attributes: {
        message: 'PONG',
        alive:   true,
      },
    }
  }.freeze

  VERSION_RESPONSE = {
    data: {
      id:         nil,
      type:       'version',
      attributes: {
        version:         ENV['VERSION'] || '1.0',
      },
    }
  }.freeze

  def show
    render json: PING_RESPONSE, status: :ok
  end

  def live
    head :ok
  end

  def ready
    status = ::DBMS::Connection.ar_up? ? :ok : :service_unavailable
    head status
  end
end
