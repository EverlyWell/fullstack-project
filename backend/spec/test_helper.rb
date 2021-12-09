ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

require 'rspec/rails'
require 'capybara/rspec'
require 'capybara/rails'

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all
end

RSpec.configure do |config|
  DatabaseCleaner.clean_with(:truncation)

  config.around(:each) do |example|
    DatabaseCleaner.start

    example.run

    DatabaseCleaner.clean
  end
end
