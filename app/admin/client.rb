ActiveAdmin.register Client do
  permit_params :name, :override_width, :logo, :logo_white, :published

  index do
    selectable_column
    id_column
    column :name
    column :published
    column :created_at
    actions
  end

  filter :name
  filter :created_at

  form do |f|
    f.inputs "Client details" do
      f.input :name, required: true
      f.input :override_width
      f.input :logo, as: :file, required: true
      f.input :logo_white, as: :file, required: true
      f.input :published
    end
    f.actions
  end
end
