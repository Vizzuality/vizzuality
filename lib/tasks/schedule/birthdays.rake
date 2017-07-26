namespace :schedule do
  desc 'Sending birthday emails'
  task birthdays: :environment do
    today = Time.now
    User.where(published: true).each do |u|
      if u.birthday and u.birthday.month == today.month and u.birthday.day == today.day
        puts 'Happy birthday ' + u.name
        ScheduleMailer.birthday_mail(u)
      end
    end
  end
end
