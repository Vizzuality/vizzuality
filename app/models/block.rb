class Block < ApplicationRecord
  belongs_to :project
  has_attached_file :thumbnail,
    styles: { large: "1096x700>" },
    default_url: ActionController::Base.helpers.asset_path('missing.png')
  validates_attachment_content_type :thumbnail, content_type: /\Aimage\/.*\z/
end
