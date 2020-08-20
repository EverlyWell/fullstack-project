require 'rails_helper'

describe GiphySearcher do
  describe '#call' do
    it 'returns a ruby hash containing giphy response' do
      expect(GiphySearcher.call('spongebob')['data']).not_to be_empty
    end
  end
end
