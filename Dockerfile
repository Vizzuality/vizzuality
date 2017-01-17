FROM ruby:2.3.3-alpine
RUN apk add --update --no-cache \
  bash \
  git \
  build-base \
  nodejs \
  tzdata \
  libxml2-dev \
  libxslt-dev \
  postgresql-dev \
  qt-dev
WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN RAILS_ENV=development bundle install --jobs 5 --retry 5
ADD . /app
