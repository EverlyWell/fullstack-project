json.array! @breeds do |breed|
  json.id breed['id']
  json.name breed['name']
end
# json.array! @breeds, partial: "api/v1/cats/breeds", as: :breed

