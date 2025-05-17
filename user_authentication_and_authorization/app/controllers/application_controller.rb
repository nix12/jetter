class ApplicationController < ActionController::API
  # Devise code
  before_action :configure_permitted_parameters, if: :devise_controller?

  # Doorkeeper code
  before_action :doorkeeper_authorize!, :current_resource_owner
  respond_to :json

  def doorkeeper_unauthorized_render_options(error: nil)
    { json: { error: "Not authorized" } }
  end

  protected

  # Devise methods
  # Authentication key(:username) and password field will be added automatically by devise.
  def configure_permitted_parameters
    added_attrs = []
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end

  private

  # Doorkeeper methods
  def current_resource_owner
    User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
  end

  def current_user
    current_resource_owner
  end
end
