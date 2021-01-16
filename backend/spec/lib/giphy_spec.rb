require 'rails_helper'
require 'giphy'

RSpec.describe Giphy do
  let (:api_key) {"giphy_api_key"}

  # make sure api key is passing through when creating a new instance
  describe "initalize" do
    it 'initializes with an api key' do
      expect(described_class.new(api_key).api_key).to eq api_key  
    end
  end

  # make sure we can get a successful search request to go through
  describe "search for a term" do
    let(:term) {'dogs'}
    #before searching we need to make sure we have a successful url request
    before do
      stub_request(:get, "api.giphy.com/v1/gifs/search?q=#{term}&api_key=#{api_key}").to_return(status:200,body:response.to_json,headers:{"Content-Type" => "application/json"})
    end

    #have subject for successful and unsuccessful cases
    let(:subject) {described_class.new(api_key)}


    context "search was successful" do
      let(:response) do
        {
          "data" => [
            {
            "type" => "gif",
            "id" => "2C2qwckZzyiz8UzvzK"
            }
          ]
        }
      end


      it "returns gifs of the term searched" do
        expect(subject.search(term).parsed_response).to eq response
      end
    end

  #   context "search was unsuccessful" do
  #     #need a bad url first
  #     before do
  #       stub_request(:get, "api.giphy.com/v1/gifs/search?q=dogs&api_key=random-key").to_return(body: "An error occurred", status: 500)
  #     end
  #   end
      
  #     it "returns an error" do
  #       get "api.giphy.com/v1/gifs/search?q=#{term}&api_key=random-key"
  #       expect(response.status).to be 500
  #     end
  end

end
