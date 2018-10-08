module DateFormatHelper

  def format_release_date(date)
    date.strftime('%B %Y.')
  end

end
