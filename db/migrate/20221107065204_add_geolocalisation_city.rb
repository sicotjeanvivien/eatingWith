class AddGeolocalisationCity < ActiveRecord::Migration[7.0]
  def change
    add_column :cities, :latitude, :string, null: true
    add_column :cities, :longitude, :string, null: true
  end
end
