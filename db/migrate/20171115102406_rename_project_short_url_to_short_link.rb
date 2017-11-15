class RenameProjectShortUrlToShortLink < ActiveRecord::Migration[5.1]
  def change
    rename_column :projects, :project_short_url, :short_link
  end
end
