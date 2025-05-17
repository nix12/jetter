# frozen_string_literal: true

module Ancestry
  # Setting the pattern this way silences the warning when
  # we overwrite a constant

  # From previous version
  # send :remove_const, :ANCESTRY_PATTERN
  # const_set :ANCESTRY_PATTERN, %r{\A[\w\-]+(/[\w\-]+)*\z}
  
  Ancestry.default_ancestry_format = %r{\A[\w\-]+(/[\w\-]+)*\z}
end
