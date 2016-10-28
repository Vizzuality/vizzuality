source 'https://rubygems.org'

ruby '2.3.1'

# Rails
gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.0'
gem 'activeadmin', git: 'https://github.com/activeadmin/activeadmin.git'
gem 'inherited_resources', git: 'https://github.com/activeadmin/inherited_resources.git'
gem 'devise'
gem 'paperclip', '~> 5.0.0'
gem 'acts_as_list'
gem 'activeadmin-sortable'
gem 'friendly_id', '~> 5.1.0'
gem 'rails_12factor', group: :production
gem 'aws-sdk', '~> 2.3'

# Front end libraries
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'jquery-rails'
gem 'turbolinks', '~> 5'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]