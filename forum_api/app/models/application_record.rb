# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def shadow_destroy
    voter_id = nil
    body = nil if body
    save!(validate: false)
  end
end
