class User < ApplicationRecord
  validates :username, uniqueness: true
  validates :username, presence: true
  validates :password_digest, length: { minimum: 5, allow_nil: true }

  has_secure_password

end
