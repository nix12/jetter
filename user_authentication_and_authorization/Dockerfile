FROM ruby:3.4.1

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs openssl

RUN mkdir /user_authentication_and_authorization

WORKDIR /user_authentication_and_authorization

COPY Gemfile /user_authentication_and_authorization/Gemfile

COPY Gemfile.lock /user_authentication_and_authorization/Gemfile.lock

RUN gem install bundler && bundle install

COPY . /user_authentication_and_authorization

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
