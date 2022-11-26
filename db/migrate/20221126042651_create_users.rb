class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password_digest
      t.string :avatar_url
      t.string :username
      t.string :bio

      t.timestamps
    end
  end
end
