# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
10.times do |i|
  unless User.find_by(email: "user-#{i}@everlywell.com")
    User.create(email: "user-#{i}@everlywell.com", password: 'password')
  end
end