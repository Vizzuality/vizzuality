class Project < ApplicationRecord
  extend FriendlyId
  friendly_id :short_title, use: :slugged
  acts_as_list column: 'weight'
  belongs_to :client
  has_attached_file :project_logo,
    styles: { medium: "300x110>" },
    default_url: ActionController::Base.helpers.image_path('missing.png')
  has_attached_file :cover_image,
    styles: { medium: "512x512>", large: "1660x800>" },
    default_url: ActionController::Base.helpers.image_path('missing.png')
  has_attached_file :project_image,
    styles: { medium: "512x512>", large: "1660x800>" },
    default_url: ActionController::Base.helpers.image_path('missing.png')
  validates_attachment_content_type :project_logo, content_type: /\Aimage\/.*\z/
  validates_attachment_content_type :cover_image, content_type: /\Aimage\/.*\z/
  validates_attachment_content_type :project_image, content_type: /\Aimage\/.*\z/

  def next
    self.class.sorted_team.where("weight > ?", weight).first
  end

  def prev
    self.class.sorted_team.where("weight < ?", weight).last
  end
end
