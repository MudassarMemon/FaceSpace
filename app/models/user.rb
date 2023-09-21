# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  gender          :string           not null
#  birthday        :date             not null
#  bio             :text
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  validates :email, :session_token, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, :last_name, :birthday, :gender, presence: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  has_secure_password
  before_validation :ensure_session_token
  validate :verify_age

  has_many :posts,
    foreign_key: :author_id,
    class_name: :Post,
    dependent: :destroy

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email.downcase)
    user&.authenticate(password)
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def verify_age
    if ((Date.today - birthday).to_i) <= (13 * 365.242374)
      puts("3")
      errors.add(:birthday, message: 'invalid. Must be over 13 years of age to sign up')
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def generate_unique_session_token
    loop do
      session_token = SecureRandom.urlsafe_base64
      return session_token unless User.exists?(session_token: session_token)
    end
  end
end
