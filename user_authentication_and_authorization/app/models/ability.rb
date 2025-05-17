# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user.roles.each do |role|
      send("#{role.name}_abilities", user)
    end
  end

  def admin_abilities(user)
    can :manage, :Jet
    can :manage, :Text
    can :manage, :Link
    can :manage, :Comment
    can :manage, User, id: user.id
  end

  def moderator_abilities(user)
    can :manage, :Jet
    can :manage, User, id: user.id
    can %i[read destroy], :Text
    can %i[read destroy], :Link
    can %i[read destroy], :Comment
  end

  def member_abilities(user)
    can :read, :all
    can :manage, :Text, voter_id: user.username
    can :manage, :Link, voter_id: user.username
    can :manage, :Comment, voter_id: user.username
    can :manage, User, id: user.id, username: user.username
  end

  def to_list
    rules.map do |rule|
      object = { actions: rule.actions, subject: rule.subjects.map { |s| s.is_a?(Symbol) ? s : s.name } }
      object[:conditions] = rule.conditions unless rule.conditions.blank?
      object[:inverted] = true unless rule.base_behavior
      object
    end
  end
end
