require 'rubygems'
require 'data_mapper'
require 'dm-migrations'
require 'dm-constraints'
require 'yaml'
require 'sinatra'
require 'sinatra/cross_origin'
require 'hashie'
require 'json'
require 'sqlite3'



module Configurations

#Read configuration file and set it to configurations variable
  configurations = begin
    YAML.load(File.open("config.yml"))
  rescue ArgumentError => e
    puts "Could not parse YAML: #{e.message}"
  end

  DATA=configurations
end

#setup database connector
DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(:default, {
    :adapter  => 'sqlite3',
    :database => "db/#{Configurations::DATA["dbFile"]}"
})

#Load models
require_relative 'models/filter'
require_relative 'models/dbmodels'


DataMapper.finalize

require_relative 'data_provider'

#Load controllers
require_relative 'api/general_controller'
require_relative 'api/products_controller'

#setup sunatra and run
set :port, Configurations::DATA["port"]
run Sinatra::Application.run!
