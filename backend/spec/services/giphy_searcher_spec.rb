require 'rails_helper'

describe GiphySearcher do
  describe '#call' do
    it 'returns a ruby hash containing giphy response' do
      expect(GiphySearcher.call({q: 'spongebob'})['data']).not_to be_empty
    end
    it 'accepts offset param' do
      page_one_data = GiphySearcher.call({q: 'patrick star'})['data'].map {|g| g['id']}
      page_two_data = GiphySearcher.call({q: 'patrick star', offset: 25})['data'].map {|g| g['id']}
      expect(page_one_data & page_two_data).to be_empty # arrays should not contain any of same ids
    end
  end
end
