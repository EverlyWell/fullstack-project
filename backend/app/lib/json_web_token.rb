class JsonWebToken
  class << self
    def encode(payload, exp = 24.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, ENV['JWT_SIGNING_KEY'])
    end

    def decode(token)
      body = JWT.decode(token, ENV['JWT_SIGNING_KEY'])[0]
      HashWithIndifferentAccess.new body
    rescue
      nil
    end
  end
end