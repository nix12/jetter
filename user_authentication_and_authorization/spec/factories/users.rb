FactoryBot.define do
  factory :user, class: User do
    sequence(:username) { |n| "user-#{ n }" }
    password { 'password' }
    password_confirmation { 'password' }

    factory :user_with_roles do
      transient do
        users_count { 1 }
      end

      after(:create) do |user, evaluator|
        create_list(:role, evaluator.users_count, users: [user])
      end
    end
  end
end
