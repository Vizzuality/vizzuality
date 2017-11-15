# == Schema Information
#
# Table name: projects
#
#  id                         :integer          not null, primary key
#  title                      :string
#  short_title                :string
#  meta_description           :string
#  fb_title                   :string
#  fb_description             :string
#  link                       :string
#  release_date               :date
#  summary                    :text
#  body                       :text
#  weight                     :integer          default(0)
#  highlighted                :boolean
#  published                  :boolean          default(FALSE)
#  client_id                  :integer
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  cover_image_file_name      :string
#  cover_image_content_type   :string
#  cover_image_file_size      :integer
#  cover_image_updated_at     :datetime
#  project_logo_file_name     :string
#  project_logo_content_type  :string
#  project_logo_file_size     :integer
#  project_logo_updated_at    :datetime
#  project_image_file_name    :string
#  project_image_content_type :string
#  project_image_file_size    :integer
#  project_image_updated_at   :datetime
#  grid                       :integer
#  slug                       :string
#  post_url                   :string
#  post_title                 :string
#

class Project < ApplicationRecord
  extend FriendlyId
  friendly_id :short_title, use: :slugged

  acts_as_list column: 'weight'

  belongs_to :client
  has_many :text_blocks, dependent: :destroy
  has_many :opinions, dependent: :destroy
  has_one :map, dependent: :destroy
  has_one :video, dependent: :destroy
  has_one :block, dependent: :destroy

  accepts_nested_attributes_for :text_blocks, allow_destroy: true
  accepts_nested_attributes_for :opinions, allow_destroy: true
  accepts_nested_attributes_for :map, allow_destroy: true
  accepts_nested_attributes_for :video, allow_destroy: true
  accepts_nested_attributes_for :block, allow_destroy: true

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
