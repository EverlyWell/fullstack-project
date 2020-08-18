require 'rails_helper'

RSpec.describe "Cats", type: :request do

  describe '#breeds' do
    context 'when successful' do

      it 'returs breeds' do
        get breeds_api_v1_cats_url
        expect(response.status).to eq(200)
      end

    end
  end

end

