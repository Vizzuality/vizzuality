class ScheduleMailerPreview < ActionMailer::Preview
  def birthday_mail_preview
    ScheduleMailer.birthday_mail(User.last)
  end
end
