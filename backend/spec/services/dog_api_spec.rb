require "rails_helper"

RSpec.describe DogApi do
  let(:key) { ENV['API_KEY'] }

  describe "#intialize" do
      it "with api key" do
          expect(described_class.new.data.headers["x-api-key"]).to eq key
      end
  end

  #TODO add more test
end