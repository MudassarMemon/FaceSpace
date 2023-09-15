# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
        email: "mudassar-memon@test.test",
        first_name: "Mudassar",
        last_name: "Memon",
        gender:"Male",
        birthday: "1995-05-03",
        password: 'password'
    )
  
    # More users
    10.times do 
        first_name = Faker::Name.first_name
        last_name = Faker::Name.last_name
      User.create!({
        first_name: first_name,
        last_name: last_name,
        email: Faker::Internet.email(name: "#{first_name} #{last_name}", separators: ['-'], domain: 'test'),
        gender: Faker::Gender.binary_type,
        birthday: Faker::Date.between(from: 18.years.ago, to: Date.today),
        password: Faker::Internet.password
      }) 
    end
  
    puts "Done!"
  end
  

