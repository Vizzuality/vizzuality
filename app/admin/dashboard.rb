ActiveAdmin.register_page "Dashboard" do

  menu priority: 1, label: proc{ I18n.t("active_admin.dashboard") }

  content title: proc{ I18n.t("active_admin.dashboard") } do
    columns do
      column do
        panel "Recent Projects" do
          ul do
            Project.all.limit(5).order('created_at DESC').map do |project|
              li link_to(project.title, admin_project_path(project))
            end
          end
        end

        panel "Recent team members" do
          ul do
            User.all.limit(5).order('created_at DESC').map do |user|
              li link_to(user.name, admin_user_path(user))
            end
          end
        end
      end

      column do
        panel "Recent Clients" do
          ul do
            Client.all.limit(5).order('created_at DESC').map do |client|
              li link_to(client.name, admin_client_path(client))
            end
          end
        end
      end
    end
  end
end
