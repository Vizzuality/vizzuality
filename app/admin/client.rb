ActiveAdmin.register Client do
  permit_params :name, :override_width, :logo, :logo_white, :published

  index do
    selectable_column
    id_column
    column :name
    column :logo do |o|
      image_tag o.logo.url(:thumb), class: 'team-photo-thumb'
    end
    column :logo_white do |o|
      image_tag o.logo_white.url(:thumb), class: 'team-photo-thumb'
    end
    column :override_width
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
      f.input :logo, as: :file, hint: f.object.logo.present? \
        ? image_tag(f.object.logo.url(:thumb))
        : content_tag(:span, "No logo yet")
      f.input :logo_white, as: :file, hint: f.object.logo_white.present? \
        ? image_tag(f.object.logo_white.url(:thumb))
        : content_tag(:span, "No logo white yet")
      f.input :published
    end
    f.actions
  end
end
