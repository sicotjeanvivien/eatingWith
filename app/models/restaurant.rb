class Restaurant < ApplicationRecord
  belongs_to :city

  has_many :comments, dependent: :destroy

  validates :name, presence: true
  validates :description, presence: true, length: { minimum: 10 }
  validates :city_id, presence: true

end
