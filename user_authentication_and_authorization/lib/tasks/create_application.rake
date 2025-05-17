# frozen_string_literal: true

namespace :doorkeeper do
  desc 'Creates an OAuth2 application for Doorkeeper'
  task :create_application, %i[application_name redirect_uri] => [:environment] do |_t, args|
    # check the arguments
    puts args.application_name
    puts args.redirect_uri
    if args.application_name.blank? || args.redirect_uri.blank?
      puts 'Usage: rake "doorkeeper:create_application[application_name, redirect_uri]"'
      exit
    end

    # create the application
    @application = Doorkeeper::Application.new(
      name: args.application_name,
      
      redirect_uri: args.redirect_uri
    )

    if @application.save
      puts 'Created Doorkeeper OAuth2 client with (name: ' + @application.name + ', redirect_uri: ' + @application.redirect_uri + ')'
      puts 'application_id: ' + @application.uid
      puts 'application_secret: ' + @application.secret
    else
      puts @application.errors.full_messages
    end
  end
end
