# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_30_144452) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "commentable_id"
    t.string "commentable_type"
    t.string "hash_id"
    t.string "voter_id"
    t.integer "cached_votes_score", default: 0
    t.string "ancestry"
    t.integer "ancestry_depth", default: 0
    t.integer "position"
    t.string "parent_id"
    t.string "post_id"
    t.index ["ancestry"], name: "index_comments_on_ancestry"
    t.index ["commentable_id"], name: "index_comments_on_commentable_id"
    t.index ["hash_id"], name: "index_comments_on_hash_id"
    t.index ["voter_id"], name: "index_comments_on_voter_id"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "jets", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.string "voter_id"
    t.text "description"
    t.integer "subscribers_count", default: 0
    t.index ["slug"], name: "index_jets_on_slug", unique: true
  end

  create_table "links", force: :cascade do |t|
    t.string "title"
    t.string "uri"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jet_id"
    t.string "hash_id"
    t.string "voter_id"
    t.string "ancestry"
    t.integer "cached_votes_score", default: 0
    t.integer "comments_count", default: 0, null: false
    t.index ["ancestry"], name: "index_links_on_ancestry"
    t.index ["hash_id"], name: "index_links_on_hash_id"
    t.index ["jet_id"], name: "index_links_on_jet_id"
    t.index ["voter_id"], name: "index_links_on_voter_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.string "jet_id"
    t.string "hash_id"
    t.string "voter_id"
    t.string "ancestry"
    t.integer "cached_votes_score", default: 0
    t.integer "comments_count", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type"
    t.text "body"
    t.string "uri"
    t.index ["ancestry"], name: "index_posts_on_ancestry"
    t.index ["hash_id"], name: "index_posts_on_hash_id"
    t.index ["jet_id"], name: "index_posts_on_jet_id"
    t.index ["voter_id"], name: "index_posts_on_voter_id"
  end

  create_table "saved_comments", force: :cascade do |t|
    t.string "voter_id"
    t.string "comment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "saved_posts", force: :cascade do |t|
    t.string "post_id"
    t.string "voter_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subscriptions", force: :cascade do |t|
    t.string "jet_id"
    t.string "voter_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["voter_id"], name: "index_subscriptions_on_voter_id"
  end

  create_table "texts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jet_id"
    t.string "hash_id"
    t.string "voter_id"
    t.integer "cached_votes_score", default: 0
    t.string "ancestry"
    t.integer "comments_count", default: 0, null: false
    t.index ["ancestry"], name: "index_texts_on_ancestry"
    t.index ["hash_id"], name: "index_texts_on_hash_id"
    t.index ["jet_id"], name: "index_texts_on_jet_id"
    t.index ["voter_id"], name: "index_texts_on_voter_id"
  end

  create_table "voters", force: :cascade do |t|
    t.string "username"
    t.string "text_id"
    t.string "comment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "rules"
    t.index ["username"], name: "index_voters_on_username"
  end

  create_table "votes", id: :serial, force: :cascade do |t|
    t.string "votable_type"
    t.string "votable_id"
    t.string "voter_type"
    t.string "voter_id"
    t.boolean "vote_flag"
    t.string "vote_scope"
    t.integer "vote_weight"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope"
    t.index ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope"
  end

end
