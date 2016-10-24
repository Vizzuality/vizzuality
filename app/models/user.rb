class User < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  acts_as_list column: :weight
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable
  has_attached_file :photo,
    styles: { medium: "512x512>" },
    default_url: ActionController::Base.helpers.asset_path('missing.png')
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\z/
end
