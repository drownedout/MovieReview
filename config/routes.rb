Rails.application.routes.draw do
  devise_for :users

  resources :films do 
  	resources :reviews, except: [:show, :index]	
  end

  root "films#index"

end
