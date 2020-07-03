# frozen_string_literal: true

FactoryBot.define do
  factory :favorite_image do
    sequence(:source_id) { |n| "source-id-#{n}" }
    sequence(:url) { |n| "example.com/image-#{n}.gif" }
    sequence(:origin_url) { |n| "example.com/images/#{n}" }

    trait :with_user do
      association :user
    end
  end
end
