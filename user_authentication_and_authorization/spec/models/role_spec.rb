require 'rails_helper'
require 'cancan/matchers'

RSpec.describe Role, type: :model do
  let(:admin) { Role.find_by(name: 'admin') }
  let(:moderator) { Role.find_by(name: 'moderator') }
  let(:member) { Role.find_by(name: 'member') }
  let(:visitor) { Role.find_by(name: 'visitor') }

  before(:all) do
    create(:role, :admin)
    create(:role, :moderator)
    create(:role, :member)
    create(:role, :visitor)
  end

  describe 'admin' do
    let(:user) { create(:user_with_roles) }
    let(:ability) { Ability.new(user) }

    before(:each) { user.add_role(:admin) }

    it 'should have name "admin"' do
      expect(admin.name).to eq('admin')
    end

    context 'abilities' do
      it 'should be able to read all jets, posts, comments, users' do
        topics = [:Jet, :Text, :Comment, User.new]

        topics.each do |topic|
          expect(ability).to be_able_to(:read, topic)
        end
      end

      it 'should manage jets' do
        expect(ability).to be_able_to(:manage, :Jet)
      end

      it 'should manage posts' do
        expect(ability).to be_able_to(:manage, :Text)
      end

      it 'should manage comments' do
        expect(ability).to be_able_to(:manage, :Comment)
      end
    end
  end

  describe 'moderator' do
    let(:user) { create(:user_with_roles) }
    let(:ability) { Ability.new(user) }

    before(:each) { user.add_role(:moderator) }

    it 'should have name "moderator"' do
      expect(moderator.name).to eq('moderator')
    end

    context 'abilities' do
      it 'should be able to read all jets, posts, comments, users' do
        topics = [:Jet, :Text, :Comment, User.new]

        topics.each do |topic|
          expect(ability).to be_able_to(:read, topic)
        end
      end

      it 'should manage posts for jet' do
        expect(ability).to be_able_to(:manage, :Text)
      end

      it 'should manage comments for jet' do
        expect(ability).to be_able_to(:manage, :Comment)
      end
    end
  end

  describe 'member' do
    let(:user) { create(:user_with_roles) }
    let(:ability) { Ability.new(user) }

    before(:each) { user.add_role(:member) }

    it 'should have name "member"' do
      expect(member.name).to eq('member')
    end

    context 'abilities' do
      it 'should be able to read all jets, posts, comments, users' do
        topics = [:Jet, :Text, :Comment, user]

        topics.each do |topic|
          expect(ability).to be_able_to(:read, topic)
        end
      end
    end
  end

  describe 'visitor' do
    let(:user) { create(:user_with_roles) }
    let(:ability) { Ability.new(user) }

    before(:each) { user.add_role(:visitor) }

    it 'should have name "visitor"' do
      expect(visitor.name).to eq('visitor')
    end

    context 'abilities' do
      it 'should be able to read all jets, posts, comments, users' do
        topics = [:Jet, :Text, :Comment, User.new]

        topics.each do |topic|
          expect(ability).to be_able_to(:read, topic)
        end
      end
    end
  end
end
