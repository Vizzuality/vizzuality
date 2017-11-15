# == Schema Information
#
# Table name: block_modules
#
#  id                 :integer          not null, primary key
#  block_id           :integer
#  description        :text
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class BlockModule < ApplicationRecord
  belongs_to :block

  has_attached_file :image,
    styles: { medium: "512x512>" },
    default_url: ActionController::Base.helpers.image_path('missing.png')

    validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
end
