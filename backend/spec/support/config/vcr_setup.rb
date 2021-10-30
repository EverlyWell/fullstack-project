require 'vcr'

VCR.configure do |c|
  c.cassette_library_dir = "spec/fixtures/vcr_cassettes"
  c.hook_into :webmock, :faraday
  c.configure_rspec_metadata!

  # Filtering the cats token
  c.filter_sensitive_data('token [CATS_API_KEY]') do |interaction|
    interaction.request.headers['x-api-key']&.first
  end
end
