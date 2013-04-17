#!/usr/bin/env ruby

require 'rubygems'
require 'sinatra'

set :commands, []

get '/' do
  redirect '/console.html'
end

post '/submit-command' do
  settings.commands << request.body.read
end

get '/next-command' do
  settings.commands.shift
end
