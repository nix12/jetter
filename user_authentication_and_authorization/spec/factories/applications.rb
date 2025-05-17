FactoryBot.define do
  factory :application, class: 'Doorkeeper::Application' do
    sequence(:name) { |n| "Application #{n}" }
    sequence(:redirect_uri) { |n| "https://example#{n}.com" }
    
    factory :owner do
      user
    end
  end
end
