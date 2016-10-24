class Client < ApplicationRecord
  has_attached_file :logo,
    styles: { medium: "300x110>" },
    default_url: ActionController::Base.helpers.asset_path('missing.png')
  has_attached_file :logo_white,
    styles: { medium: "300x110>" },
    default_url: ActionController::Base.helpers.asset_path('missing.png')
  validates_attachment_content_type :logo, content_type: /\Aimage\/.*\z/
  validates_attachment_content_type :logo_white, content_type: /\Aimage\/.*\z/
end
