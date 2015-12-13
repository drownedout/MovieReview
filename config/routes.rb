Rails.application.routes.draw do
  devise_for :users

  resources :films do 
  	collection do
  		get 'search'
  	end
  	resources :reviews, except: [:show, :index]	
  end

  root "films#index"

end
