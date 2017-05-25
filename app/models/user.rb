class User < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged
  acts_as_list column: :weight

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable

  has_attached_file :photo,
    styles: { medium: "512x512>", thumb: "70x70>" },
    default_url: ActionController::Base.helpers.image_path('missing.png')

  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\z/
  validates :name, :email, presence: true
  validates :password, :password_confirmation, presence: true, on: :create
  validates :password, confirmation: true

  def self.sorted_team
    self.where(published: true).order('weight asc')
  end

  def next
    self.class.sorted_team.where("weight > ?", weight).first
  end

  def prev
    self.class.sorted_team.where("weight < ?", weight).last
  end
end
