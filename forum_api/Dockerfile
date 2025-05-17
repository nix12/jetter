FROM ruby:3.4.1

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /forum_api

WORKDIR /forum_api

COPY Gemfile /forum_api/Gemfile

COPY Gemfile.lock /forum_api/Gemfile.lock

RUN gem install bundler && bundle install

COPY . /forum_api

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]