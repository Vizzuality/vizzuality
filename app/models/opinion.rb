class Opinion < ApplicationRecord
  belongs_to :project
  has_attached_file :thumbnail,
    styles: { small: "200x50>" },
    default_url: ActionController::Base.helpers.image_path('missing.png')
  validates_attachment_content_type :thumbnail, content_type: /\Aimage\/.*\z/
end
