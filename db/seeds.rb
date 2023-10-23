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
  Like.destroy_all
  Comment.destroy_all
  Friend.destroy_all
  
  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('posts')
  ApplicationRecord.connection.reset_pk_sequence!('likes')
  ApplicationRecord.connection.reset_pk_sequence!('comments')
  ApplicationRecord.connection.reset_pk_sequence!('friends')
end
  
  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  
  
  User.create!(
    email: "michael.scott@dundermifflin.com",
    first_name: "Michael",
    last_name: "Scott",
    gender: "Male",
    birthday: "1964-03-15",
    password: 'worldsbestboss',
    bio: "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "Scranton, Pennsylvania",
    school: "Valley View High School",
    pronunciation: "Worlds-Best-Boss"
    )

  User.create!(
    email: "kevin.malone@dundermifflin.com",
    first_name: "Kevin",
    last_name: "Malone",
    gender: "Male",
    birthday: "1968-06-01",
    password: 'chiliking',
    bio: "Nope it's not Ashton Kutcher, it's Kevin Malone. Equally handsome, equally smart.",
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "Scranton, Pennsylvania",
    )

  User.create!(
    email: "jim.halpert@dundermifflin.com",
    first_name: "Jim",
    last_name: "Halpert",
    gender: "Male",
    birthday: "1978-10-01",
    password: 'bigtuna',
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "Scranton, Pennsylvania",
    )
  
  User.create!(
    email: "angela.martin@dundermifflin.com",
    first_name: "Angela",
    last_name: "Martin",
    gender: "Female",
    birthday: "1971-06-25",
    password: 'catlover',
    bio: "Head of the party planning committee",
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "Scranton, Pennsylvania",
    school: "Marywood University",
    )
    
  User.create!(
    email: "stanley.hudson@dundermifflin.com",
    first_name: "Stanley",
    last_name: "Hudson",
    gender: "Male",
    birthday: "1958-02-19",
    password: 'crosswordking',
    bio: "Christmas, is Christmas, is Christmas, is Christmas.",
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "Scranton, Pennsylvania",
    )
    
  User.create!(
    email: "meredith.palmer@dundermifflin.com",
    first_name: "Meredith",
    last_name: "Palmer",
    gender: "Female",
    birthday: "1959-05-12",
    password: 'supplierrelations',
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "Scranton, Pennsylvania",
    )
        
  User.create!(
    email: "dwight.schrute@dundermifflin.com",
    first_name: "Dwight",
    last_name: "Schrute",
    gender: "Male",
    birthday: "1970-01-20",
    password: 'beetfarmer',
    bio: "I am fast. To give you a reference point, I am somewhere between a snake and a mongoose… and a panther.",
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "Scranton, Pennsylvania",
    school: "Shrute Farms Home School",
    )
  
  User.create!(
    email: "pam.beesly@dundermifflin.com",
    first_name: "Pam",
    last_name: "Beesly",
    gender: "Female",
    birthday: "1979-03-25",
    password: 'receptionist',
    bio: "When you're a kid, you assume your parents are soulmates. My kids are going to be right about that.",
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "Scranton, Pennsylvania",
    school: "Marywood University",
    )
    
  User.create!(
    email: "toby.flenderson@dundermifflin.com",
    first_name: "Toby",
    last_name: "Flenderson",
    gender: "Male",
    birthday: "1963-10-22",
    password: 'hrnightmare',
    bio: "Can't wait for my first trip to Peru!",
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "Scranton, Pennsylvania",
    )
      
  User.create!(
    email: "ryan.howard@dundermifflin.com",
    first_name: "Ryan",
    last_name: "Howard",
    gender: "Male",
    birthday: "1979-05-05",
    password: 'temp1234',
    bio: "Youngest CEO in the game.",
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "New York, New York",
    )

  User.create!(
    email: "andy.bernard@dundermifflin.com",
    first_name: "Andy (narddog)",
    last_name: "Bernard",
    gender: "Male",
    birthday: "1973-07-24",
    password: 'narddog',
    bio: "I went to Cornell, ever heard of it?",
    workplace: "Dunder Mifflin",
    hometown: "Concord, New Hampshire",
    current_city: "Scranton, Pennsylvania",
    school: "Cornell University",
    )
  
  User.create!(
    email: "darryl.philbin@dundermifflin.com",
    first_name: "Darryl",
    last_name: "Philbin",
    gender: "Male",
    birthday: "1968-08-10",
    password: 'warehouseboss',
    bio: Faker::Quote.famous_last_words,
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "Scranton, Pennsylvania",
    )

  User.create!(
    email: "oscar.martinez@dundermifflin.com",
    first_name: "Oscar",
    last_name: "Martinez",
    gender: "Male",
    birthday: "1968-02-19",
    password: 'accountinggenius',
    bio: "Too much change is not a good thing. Ask the climate.",
    workplace: "Dunder Mifflin",
    hometown: "Scranton, Pennsylvania",
    current_city: "Scranton, Pennsylvania",
    )
    
    User.create!(
      email: "kelly.kapoor@dundermifflin.com",
      first_name: "Kelly",
      last_name: "Kapoor",
      gender: "Female",
      birthday: "1980-02-05",
      password: 'customerServiceRep',
      bio: "You know what? I would like to be married and have a hundred kids so I can have a hundred friends, and no one can say no to being my friend.",
      workplace: "Dunder Mifflin",
      hometown: "Scranton, Pennsylvania",
      current_city: "Scranton, Pennsylvania",
      )
      
      User.create!(
        email: "creed.bratton@dundermifflin.com",
        first_name: "Creed",
        last_name: "Bratton",
        gender: "Male",
        birthday: "1925-11-01",
        password: 'quabityassurance',
        bio: "You're not real, man!",
        workplace: "Dunder Mifflin",
        hometown: "Los Angeles, California",
        current_city: "Scranton, Pennsylvania",
        )
        
        User.create!(
          email: "demo@demo.com",
          first_name: "Demo",
          last_name: "User",
          gender:"Male",
          birthday: "1939-05-03",
          password: "password",
          bio:Faker::Quote.famous_last_words,
          workplace: "Meta",
          hometown: "Toronto, Canada",
          current_city: "New York, New York",
          school: "Stony Brook University",
          pronunciation: "Deh-Moh You-Zer"
          )
          
  puts "Attaching images..."

  # User.first(15).each_with_index do |user, index|
  #   file_path = Rails.root.join("storage", "images", "cover-photo", "cover_photo_#{index+1}.jpg")
  #   user.cover.attach(
  #     io: File.open(file_path),
  #     filename: "cover_photo_#{index+1}.jpg"
  #     )
  # end
    
  
  # User.first(15).each_with_index do |user, index|
  #   file_path = Rails.root.join("storage", "images", "profile-pic", "profile_pic_#{index+1}.jpg")
  #   user.avatar.attach(
  #     io: File.open(file_path),
  #     filename: "profile_pic_#{index+1}.jpg"
  #     )
  # end

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
    author_id: 16,
    feed_id: 16,
    body: "This is my first post!"
  })
  
  2.times do 
    Post.create!({
      author_id: 16,
      feed_id: 16,
      body: Faker::Quotes::Shakespeare.hamlet_quote
    })
  end
    
  posts = {
    1 => ["Thats what she said!", "I'm not superstitious, but I am a little stitious.", "Almost done my screenplay!", "I love inside jokes. I'd love to be a part of one someday." , "I knew exactly what to do. But in a much more real sense, I had no idea what to do."],
    2 => ["I have very little patience for stupidity.", "Why waste time say lot word when few word do trick."],
    5 => ["Did I stutter?"],
    7 => ["Bears, Beets, Battlestar Galactica."],
    10 => ["I'm not saying I had a meteoric rise, but I did.", "Earth. You don't have to be crazy to live here, but it helps."],
    11 => ["I wish there was a way to know you're in the good old days before you've actually left them."],
    15 => ["If I can't scuba, then what's this all been about? What am I working toward?"]
    }

    empty = false

    while !empty
      empty = true
      (1..15).each do |i|
        if (posts[i] && posts[i].length > 0)
          empty = false
          Post.create!({
          author_id: i,
          feed_id: i,
          body: posts[i].pop()
        })
      end
    end
  end




  demo_posts = ["Starting the day with a fresh cup of coffee in hand is pure bliss! ☕️✨", "Nothing beats the breathtaking beauty of the evening sky painted with sunset hues! 🌅", "Treating myself to a spa day — relaxation and rejuvenation at its best! 🧖‍♀️💆‍♂️🌿", "Waking up to breakfast in bed feels like the universe's way of saying 'good morning!' 🥞🍳🌞", "Spotted a cute puppy today and it instantly melted my heart! 🐶❤️"]
  
  demo_posts.each do |post|
    Post.create!({
      author_id: 16,
      feed_id: 16,
      body: post
    })
  end

  posts = Post.all;

  (16..20).each do |i|
    posts[i].photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/demo#{i+3}.jpg"),
    filename: "demo#{i+3}.jpg"
    )
  end

  michael_posts = ["Lice pro tip: A nice peanut butter scalp massage does wonders. 🥜", 
  "CPR training in the conference room!", "The mug don't lie.",
   "Started from the bottom. 💯"]
  
  pam_posts = ["Besties! 💕"]

  andy_posts = ["Here comes treble! My Cornell acapella group visited today Good times. By the way, did you hear, I went to Cornell?"]

  dwight_posts = ["Who did this!? Turn yourself in!",
   "Don't play with fire, kids.",
    "I am definitely winning best costume."]

  angela_posts = ["Oh D", 
  "Look at how cute Sprinkles looks! ✨"]

  kevin_posts = ["At least once a year, I like to bring in some of my Kevin's Famous Chili. The trick is to undercook the onions. Everybody is going to get to know each other in the pot. I'm serious about this stuff. I'm up the night before pressing garlic and dicing whole tomatoes. I toast my own Ancho chilies. It's a recipe passed down from Malones for generations. It's probably the thing I do best."] 

  jim_posts = ["6 days of no nonsense. Keep up the good work folks!",
  "Question - What kind of bear is best?"]

  
  post = Post.create!({
    author_id: 7,
    feed_id: 7,
    body: dwight_posts[2]
  })
  
  post.photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/dwight3.jpg"),
    filename: "dwight3.jpg"
    )
  

  post = Post.create!({
    author_id: 1,
    feed_id: 1,
    body: michael_posts[1]
  })
  
  post.photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/michael2.jpg"),
    filename: "michael2.jpg"
    )
  
  
  post = Post.create!({
    author_id: 4,
    feed_id: 4,
    body: angela_posts[0]
  })
  
  post.photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/angela1.jpg"),
    filename: "angela1.jpg"
    )
  

  post = Post.create!({
    author_id: 4,
    feed_id: 4,
    body: angela_posts[1]
  })
  
  post.photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/angela2.jpg"),
    filename: "angela2.jpg"
    )
  
  post = Post.create!({
    author_id: 8,
    feed_id: 8,
    body: pam_posts[0]
  })
  
  post.photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/pam1.jpeg"),
    filename: "pam1.jpeg"
    )
  

  post = Post.create!({
    author_id: 3,
    feed_id: 3,
    body: jim_posts[0]
  })
  
  post.photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/jim1.jpg"),
    filename: "jim1.jpg"
    )

    
  post = Post.create!({
    author_id: 1,
    feed_id: 1,
    body: michael_posts[0]
  })
  
  post.photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/michael1.jpg"),
    filename: "michael1.jpg"
    )
  
    post = Post.create!({
      author_id: 1,
      feed_id: 1,
      body: michael_posts[3]
    })
    
    post.photo.attach(
      io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/michael4.jpg"),
      filename: "michael4.jpg"
      )
  

  post = Post.create!({
    author_id: 7,
    feed_id: 7,
    body: dwight_posts[1]
  })
  
  post.photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/dwight2.jpg"),
    filename: "dwight2.jpg"
    )

    post = Post.create!({
      author_id: 1,
      feed_id: 1,
      body: michael_posts[2]
    })
    
    post.photo.attach(
      io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/michael3.jpg"),
      filename: "michael3.jpg"
      )

  post = Post.create!({
    author_id: 7,
    feed_id: 7,
    body: dwight_posts[0]
  })
  
  post.photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/dwight1.jpeg"),
    filename: "dwight1.jpeg"
    )
  

  post = Post.create!({
    author_id: 2,
    feed_id: 2,
    body: kevin_posts[0]
  })
  
  post.photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/kevin1.jpg"),
    filename: "kevin1.jpg"
    )
  

  post = Post.create!({
    author_id: 3,
    feed_id: 3,
    body: jim_posts[1]
  })
  
  post.photo.attach(
    io: URI.open("https://facespace-fs-seeds.s3.amazonaws.com/jim2.jpg"),
    filename: "jim2.jpg"
    )
  
  Comment.create(
    author_id: 7,
    post_id: post.id,
    body: "Identity theft is not a joke jim!" 
  )


  puts "Creating friends..."
  
  friendships = []

  def is_unique(x, y, friendships)
    friendships.each do |friendship|
      if friendship.include?(x) && friendship.include?(y)
        return false
      end
    end
    return true
  end
  
  (1..16).each do |user_id|
    3.times do
      friend_id = rand(1..16)
      while (friend_id == user_id || !is_unique(friend_id, user_id, friendships))
        friend_id = rand(1..16)
      end
      friendships.push([user_id, friend_id])
    end
  end


  friendships.each_with_index do |friendship, i|
    if (i % 3 == 0)
      status = false
    else
      status = true
    end

    Friend.create(user_id: friendship[0], friend_id: friendship[1], status: status)
  end

puts "Done!"