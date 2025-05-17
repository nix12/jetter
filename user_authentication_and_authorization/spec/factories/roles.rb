FactoryBot.define do
  factory :role, class: Role do
    name { 'user roles' }

    trait :admin do
      name { 'admin' }

      transient do
        roles_count { 1 }
      end

      after(:create) do |role, evaluator|
        create_list(:user, evaluator.roles_count, roles: [role])
      end
    end

    trait :moderator do
      name { 'moderator' }

      transient do
        roles_count { 1 }
      end

      after(:create) do |role, evaluator|
        create_list(:user, evaluator.roles_count, roles: [role])
      end
    end

    trait :member do
      name { 'member' }

      transient do
        roles_count { 1 }
      end

      after(:create) do |role, evaluator|
        create_list(:user, evaluator.roles_count, roles: [role])
      end
    end

    trait :visitor do
      name { 'visitor' }

      transient do
        roles_count { 1 }
      end

      after(:create) do |role, evaluator|
        create_list(:user, evaluator.roles_count, roles: [role])
      end
    end
  end
end
