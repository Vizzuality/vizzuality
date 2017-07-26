class ScheduleMailer < ApplicationMailer
  default from: 'notifications@davidsingal.com'

  def birthday_mail(birthday_guy)
    team = User.all
    recipients = team.map { |t| t.email }
    @birthday_guy = birthday_guy
    mail(to: recipients.join(','), subject: 'Happy birthday!').deliver
  end
end
