class ApiController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  # after_action :set_csrf_cookie_for_ng


  # private
  # def set_csrf_cookie_for_ng
  #   cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  # end
  #
  # protected
  #
  # def verified_request?
  #   p request.headers['X-XSRF-TOKEN']
  #   super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
  # end
end
