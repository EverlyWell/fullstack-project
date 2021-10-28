module Api
  module V1
    class CatsController < ApplicationController
      include ::UserScopeableController

      def index
      end
    end
  end
end
