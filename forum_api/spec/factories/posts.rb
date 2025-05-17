FactoryBot.define do
  factory :post do
    title { "MyString" }
    jet_id { "MyString" }
    hash_id { "MyString" }
    voter_id { "MyString" }
    ancestry { "MyString" }
    cached_votes_score { 1 }
    comments_count { 1 }
  end
end
