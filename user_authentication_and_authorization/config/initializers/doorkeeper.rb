# frozen_string_literal: true

Doorkeeper.configure do
  api_only
  access_token_generator '::Doorkeeper::JWT'

  # Change the ORM that doorkeeper will use (needs plugins)
  orm :active_record

  # This block will be called to check whether the resource owner is authenticated or not.
  resource_owner_authenticator do
    # fail "Please configure doorkeeper resource_owner_authenticator block located in #{__FILE__}"
    # Put your resource owner authentication logic here.
    # Example implementation:
    current_user || warden.authenticate!(scope: :user)
  end

  # In this flow, a token is requested in exchange for the resource owner credentials (username and password)
  resource_owner_from_credentials do |_routes|
    user = User.find_for_database_authentication(username: params[:username])
    if user&.valid_for_authentication? { user.valid_password?(params[:password]) }
      user
    end
  end

  # Access token expiration time (default 2 hours).
  # If you want to disable expiration, set this to nil.
  access_token_expires_in 5.days

  #
  # implicit and password grant flows have risks that you should understand
  # before enabling:
  #   http://tools.ietf.org/html/rfc6819#section-4.4.2
  #   http://tools.ietf.org/html/rfc6819#section-4.4.3
  #
  # grant_flows %w(authorization_code client_credentials)
  grant_flows %w[password client_credentials]

  # Under some circumstances you might want to have applications auto-approved,
  # so that the user skips the authorization step.
  # For example if dealing with a trusted application.
  # skip_authorization do |resource_owner, client|
  #   client.superapp? or resource_owner.admin?
  # end
  skip_authorization do
    true
  end

  # WWW-Authenticate Realm (default "Doorkeeper").
  # realm "Doorkeeper"
end

Doorkeeper::JWT.configure do
  # Set the payload for the JWT token. This should contain unique information
  # about the user. Defaults to a randomly generated token in a hash:
  #     { token: "RANDOM-TOKEN" }
  token_payload do |opts|
    user = User.find(opts[:resource_owner_id])

    {
      iss: Rails.application.class.parent.to_s.underscore,
      iat: Time.current.utc.to_i,

      # @see JWT reserved claims - https://tools.ietf.org/html/draft-jones-json-web-token-07#page-7
      jti: SecureRandom.uuid,

      user: {
        id: user.id,
        username: user.username,
        roles: user.roles.pluck(:name),
        rules: Ability.new(user).to_list
      }
    }
  end

  # Optionally set additional headers for the JWT. See
  # token_headers do |opts|
  #   { kid: opts[:application][:uid] }
  # end

  # Use the application secret specified in the access grant token. Defaults to
  # `false`. If you specify `use_application_secret true`, both `secret_key` and
  # `secret_key_path` will be ignored.
  use_application_secret false

  # Set the encryption secret. This would be shared with any other applications
  # that should be able to read the payload of the token. Defaults to "secret".
  # secret_key Rails.application.credentials.doorkeeper[:jwt_secret] # ENV['JWT_SECRET'] <- Previous
  secret_key Rails.application.credentials.dig(:doorkeeper, :jwt_secret)

  # If you want to use RS* encoding specify the path to the RSA key to use for
  # signing. If you specify a `secret_key_path` it will be used instead of
  # `secret_key`.
  secret_key_path File.join('path', 'to', 'file.pem')

  # Specify encryption type (https://github.com/progrium/ruby-jwt). Defaults to
  # `nil`.
  encryption_method :hs512
end
