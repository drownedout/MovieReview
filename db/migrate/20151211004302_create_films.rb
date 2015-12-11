class CreateFilms < ActiveRecord::Migration
  def change
    create_table :films do |t|
      t.string :title
      t.text :description
      t.string :movie_length
      t.string :director
      t.string :rating

      t.timestamps null: false
    end
  end
end
