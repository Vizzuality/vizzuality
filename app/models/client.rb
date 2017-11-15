# == Schema Information
#
# Table name: clients
#
#  id                      :integer          not null, primary key
#  name                    :string
#  override_width          :integer
#  published               :boolean          default(FALSE)
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  logo_file_name          :string
#  logo_content_type       :string
#  logo_file_size          :integer
#  logo_updated_at         :datetime
#  logo_white_file_name    :string
#  logo_white_content_type :string
#  logo_white_file_size    :integer
#  logo_white_updated_at   :datetime
#

class Client < ApplicationRecord
  has_attached_file :logo,
    styles: { medium: "300x110>", thumb: "70x70>" },
    default_url: ActionController::Base.helpers.image_path('missing.png')
  has_attached_file :logo_white,
    styles: { medium: "300x110>", thumb: "70x70>" },
    default_url: ActionController::Base.helpers.image_path('missing.png')
  validates_attachment_content_type :logo, content_type: /\Aimage\/.*\z/
  validates_attachment_content_type :logo_white, content_type: /\Aimage\/.*\z/
end
