# == Schema Information
#
# Table name: opinions
#
#  id                     :integer          not null, primary key
#  title                  :string
#  thumbnail_file_name    :string
#  thumbnail_content_type :string
#  thumbnail_file_size    :integer
#  thumbnail_updated_at   :datetime
#  author_name            :string
#  project_id             :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  author_url             :string
#

class Opinion < ApplicationRecord
  belongs_to :project

  has_attached_file :thumbnail,
    styles: { small: "200x50>" },
    default_url: ActionController::Base.helpers.image_path('missing.png')
    
  validates_attachment_content_type :thumbnail, content_type: /\Aimage\/.*\z/
end
