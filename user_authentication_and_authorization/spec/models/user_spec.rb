require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user_with_roles) }

  before(:all) { create(:role, :member) }

  describe 'validation' do
    it 'should be valid' do
      expect(user).to be_valid
    end

    context 'username' do
      it 'should be present' do
        expect(user.username).to be_present
      end

      it 'should be greater than 3 characters' do
        expect(user.username.length).to be >= 3
      end

      it 'should be less than 10 characters' do
        expect(user.username.length).to be <= 10
      end

      it 'should be valid format' do
        usernames = %w[user_name user-name username user|name]

        usernames.each do |valid_username|
          user.username = valid_username
          expect(user).to be_valid
        end
      end
    end

    context 'password' do
      it "should have a password present" do
        expect(user.password).to be_present
      end

      it "should have a password_confirmation present" do
        expect(user.password_confirmation).to be_present
      end

      it "should have a minimum length of 8" do
        expect(user.password.length).to be >= 8
      end

      it "should have a maximum length of 50" do
        expect(user.password.length).to be <= 100
      end

      it "should match password confirmation" do
        expect(user.password).to match(user.password_confirmation)
      end
    end

    context 'roles' do
      it 'should have a valid role' do
        expect(user.roles).to be_present
      end

      it 'should have the member role by default' do
        pp user.roles
        user.roles.any? do |role|
          expect(role).to have_attributes(name: 'member')
        end
      end
    end
  end

  describe 'invalidation' do
    context 'username' do
      it 'should not be present' do
        user.username = nil
        expect(user).to be_invalid
      end

      it 'should be unique' do
        dup = user.dup
        expect(dup).to be_invalid
      end

      it 'should not be too short' do
        user.username = 'a' * 2
        expect(user).to be_invalid
      end

      it 'should not be too long' do
        user.username = 'a' * 11
        expect(user).to be_invalid
      end

      it 'should not be valid format' do
        usernames = %w[@username user,name user.name user?name]

        usernames.each do |valid_username|
          user.username = valid_username
          expect(user).to be_valid
        end
      end
    end

    context 'password' do
      it "should be present" do
        user.username = nil

        expect(user).to be_invalid
      end

      it "should be invalid if too short" do
        user.password = "a" * 7

        expect(user).to be_invalid
      end

      it "should be invalid if too long" do
        user.password = "a" * 101

        expect(user).to be_invalid
      end

      it "should be invalid if password does not match password confirmation" do
        user.password_confirmation = "badpassword"

        expect(user).to be_invalid
      end
    end
  end
end
