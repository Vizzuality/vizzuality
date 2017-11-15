# == Schema Information
#
# Table name: text_blocks
#
#  id                 :integer          not null, primary key
#  title              :string
#  description        :text
#  text_side          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  project_id         :integer
#

class TextBlock < ApplicationRecord
  belongs_to :project

  has_attached_file :image,
    styles: { thumb: "250x250", medium: "512x512>" },
    default_url: ActionController::Base.helpers.image_path('missing.png')

  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  def self.options_for_text_side
    [
      ['Left', 'left'],
      ['Right', 'right']
    ]
  end
end
