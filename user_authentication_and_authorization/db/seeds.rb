# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Role.find_or_create_by(id: 1, name: 'admin')
Role.find_or_create_by(id: 2, name: 'moderator')
Role.find_or_create_by(id: 3, name: 'member')
