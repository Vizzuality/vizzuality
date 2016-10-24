Rails.application.routes.draw do
  devise_for :users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'welcome#index'

  get '/about', to: 'about#index'
  get '/about/:team_member_id', to: 'about#show', as: 'team_member'

  resources :projects, only: [:show]
end
