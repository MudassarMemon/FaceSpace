class User < ApplicationRecord
  validates :email, :session_token, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, :last_name, :birthday, :gender, presence: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  has_secure_password
  before_validation :ensure_session_token
  validate :verify_age

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
    if birthday.present? && (Date.today - birthday).to_i < (18 *365)
      errors.add(:birthday, 'invalid. Must be over 18 years of age to sign up')
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
