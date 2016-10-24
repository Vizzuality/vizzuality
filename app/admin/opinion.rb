ActiveAdmin.register Opinion do
  permit_params :author, :description, :thumbnail, :project_id, :published

  index do
    selectable_column
    id_column
    column :author
    column :description
    column :project_id
    column :published
    column :created_at
    actions
  end

  filter :author
  filter :project_id
  filter :published
  filter :created_at

  form do |f|
    f.inputs "Opinion details" do
      f.input :project, include_blank: false
      f.input :author
      f.input :description, required: true
      f.input :thumbnail, as: :file
      f.input :published
    end
    f.actions
  end
end
