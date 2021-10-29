require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }

  it 'has a valid factory' do
    expect(user).to be_valid
  end

  context 'attributes' do
    it { is_expected.to respond_to(:email) }
    it { is_expected.to respond_to(:password) }
    it { is_expected.to respond_to(:password_confirmation) }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:password_digest) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
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
