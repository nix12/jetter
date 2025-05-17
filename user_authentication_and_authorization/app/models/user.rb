# frozen_string_literal: true

class User < ApplicationRecord
  before_create :assign_default_role
  before_save { username.downcase! }

  has_and_belongs_to_many :roles

  extend FriendlyId
  friendly_id :username, use: :slugged

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :registerable, :recoverable, :rememberable, :validatable
  devise :database_authenticatable, authentication_keys: [:username]

  VALID_USERNAME_REGEX = /[\w\s\|-]+/i.freeze

  validates :username, uniqueness: { case_sensitive: false },
                       presence: true, length: { minimum: 3, maximum: 15 },
                       format: { with: VALID_USERNAME_REGEX }

  def email_required?
    false
  end

  # use this instead of email_changed? for Rails = 5.1.x
  def will_save_change_to_email?
    false
  end

  # role methods are used with CanCanCan
  %i[admin moderator member].each do |role|
    define_method("#{role}?") { roles.exists?(name: role) }
  end

  def add_role(role)
    roles << Role.find_by(name: role) unless send("#{role}?")
  end

  def remove_role(role)
    roles.delete(Role.find_by(name: role)) if send("#{role}?")
  end

  def assign_default_role
    add_role(:member) if roles.blank?
  end
end
