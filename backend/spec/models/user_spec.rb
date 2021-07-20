require 'rails_helper'

RSpec.describe User, type: :model do
  it "validates uniqueness" do
    should validate_uniqueness_of(:username)
  end
end
