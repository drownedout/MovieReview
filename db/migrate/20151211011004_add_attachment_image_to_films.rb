class AddAttachmentImageToFilms < ActiveRecord::Migration
  def self.up
    change_table :films do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :films, :image
  end
end
