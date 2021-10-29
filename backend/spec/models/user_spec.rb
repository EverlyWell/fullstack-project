require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'is valid with valid attributes' do
    subject { described_class.new }

    it 'is valid with valid attributes' do
      subject.email = Faker::Internet.email
      password = Faker::Internet.password
      subject.password = password
      subject.password_confirmation = password
      expect(subject).to be_valid
    end
  end

  describe '.authenticate' do
    let(:password) { Faker::Internet.password }
    subject { create(:user, password: password, password_confirmation: password) }

    it 'success' do
      expect(subject.authenticate(password)).to be_truthy
    end

    it 'fails' do
      expect(subject.authenticate(Faker::Internet.password)).to be_falsey
    end
  end
end
