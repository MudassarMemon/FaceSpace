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
#  profile_pic_url :string
#  cover_pic_url   :string
#  workplace       :string
#  hometown        :string
#  current_city    :string
#  school          :string
#  pronunciation   :string
#
class User < ApplicationRecord
  validates :email, :session_token, presence: true, uniqueness: true
  # validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, :last_name, :birthday, :gender, presence: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  has_secure_password
  before_validation :ensure_session_token
  validate :email_format
  validate :verify_age

  has_one_attached :cover
  has_one_attached :avatar

  has_many :posts,
    foreign_key: :feed_id,
    class_name: :Post,
    dependent: :destroy

  has_many :authored_posts,
    foreign_key: :author_id,
    class_name: :Post,
    dependent: :destroy

  has_many :comments,
    foreign_key: :author_id,
    class_name: :Comment,
    dependent: :destroy

  has_many :likes,
    class_name: :Like,
    dependent: :destroy

  has_many :friends,
    foreign_key: :user_id,
    class_name: :Friend,
    dependent: :destroy

  has_many :friend_requests,
    foreign_key: :friend_id,
    class_name: :Friend,
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
      errors.add(:birthday, message: 'invalid. Must be 13 years of age or older to sign up')
    end
  end

  def email_format
  
    email_parts = email.split("@")
    if email_parts.length != 2 || email_parts[0].empty? || email_parts[1].empty?
      errors.add(:email, message: 'invalid.')
      return
    end

    email_tlds = [
    "com",
    "net",
    "org",
    "edu",
    "gov",
    "mil",
    "int",
    "eu",
    "us",
    "uk",
    "ca",
    "au",
    "nz",
    "jp",
    "cn",
    "in",
    "br",
    "mx",
    "ru",
    "za",
    "ch",
    "fr",
    "de",
    "it",
    "es",
    "io"
  ]
    email_domain = email_parts[1].split(".")
    if email_domain.length != 2 || email_domain[0].empty? || email_domain[1].empty? || !email_tlds.include?(email_domain[1])
      errors.add(:email, message: 'invalid.')
      return
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
