class Giphy
    include HTTParty
    base_uri 'api.giphy.com/v1/gifs'

    attr_reader :api_key
    
    def initialize(api_key)
        @api_key = api_key
    end

    #search url for api, need term and api key
    def search(term)
        url = "/search?q=#{term}&api_key=#{@api_key}"
        request url
    end

    private

    #send request to Giphy API

    def request(url)
        self.class.get url
    rescue StandardError => e
        puts "An error has occurred: #{e}"
    end
end