Giphy::Configuration.configure do |config|
  config.api_key = Rails.application.credentials.giphy[:key]
end
