class AddAuthorNameAndUrlToOpinions < ActiveRecord::Migration[5.1]
  def change
    add_column :opinions, :author_url, :string
    rename_column :opinions, :author, :author_name
  end
end
