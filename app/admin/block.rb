ActiveAdmin.register Block do
  permit_params :block_type, :title, :url, :description, :thumbnail,
    :project_id, :published

  block_types = [
    ['Text left', 0],
    ['Text right', 1],
    ['Text above', 2],
    ['Video', 3],
    ['Map or embed', 4]
  ]

  index do
    selectable_column
    id_column
    column :block_type
    column :title
    column :project_id
    column :published
    column :created_at
    actions
  end

  filter :title
  filter :published
  filter :project_id
  filter :created_at

  form do |f|
    f.inputs "Block details" do
      f.input :project, required: true, include_blank: false
      f.input :block_type, required: true, as: :select, collection: block_types, include_blank: false
      f.input :title, required: true
      f.input :url
      f.input :description
      f.input :thumbnail, as: :file
      f.input :published
    end
    f.actions
  end
end
