class AddGeolocalisationRestaurants < ActiveRecord::Migration[7.0]
  def change
    add_column :restaurants, :latitude, :string, null: true
    add_column :restaurants, :longitude, :string, null: true
  end
end
