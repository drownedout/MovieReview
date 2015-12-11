json.array!(@films) do |film|
  json.extract! film, :id, :title, :description, :movie_length, :director, :rating
  json.url film_url(film, format: :json)
end
