# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Post.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('posts')
end

puts "Creating users..."
# Create one user with an easy to remember username, email, and password:

15.times do 
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
User.create!({
  first_name: first_name,
  last_name: last_name,
  email: Faker::Internet.email(name: "#{first_name} #{last_name}", separators: ['-'], domain: 'test'),
  gender: Faker::Gender.binary_type,
  birthday: Faker::Date.birthday(min_age: 13, max_age: 130),
  password: "password",
  bio: Faker::Quote.famous_last_words
}) 
end

User.create!(
  email: "mudassar-memon@test.test",
  first_name: "Mudassar",
  last_name: "Memon",
  gender:"Male",
  birthday: "1995-05-03",
  password: 'password',
  bio:Faker::Quote.famous_last_words,
  workplace: "Meta",
  hometown: "Burlington, Ontario",
  current_city: "New York, New York",
  school: "Stony Brook University",
  pronunciation: "Muh-duh-sar Mem-in"
)

puts "Attaching images..."

User.first(15).each_with_index do |user, index|
  user.cover.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/cover_photo_#{index+1}.jpg"),
    filename: "cover_photo_#{index+1}.jpg"
  )
end

User.first(15).each_with_index do |user, index|
  user.avatar.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/profile_pic_#{index+1}.jpg"),
    filename: "profile_pic_#{index+1}.jpg"
  )
end

puts "Creating posts..."

Post.create!({
  author_id: 1,
  feed_id: 1,
  body: "This is my first post!"
})

# More posts
30.times do 
num1 = rand(1..16)
num2 = rand(1..16)
Post.create!({
  author_id: num1,
  feed_id: num2,
  body: Faker::Quotes::Shakespeare.hamlet_quote
})
end

puts "Done!"
