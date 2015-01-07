module CardReuse
  def all_cards_for_user(user)
    return nil unless user

    credit_cards = user.credit_cards
    credit_cards.delete_if { |card| unvalid_for_reuse? card }
  end

  def card_expired?(payment_source)
    exp = DateTime.new(payment_source.year.to_i, payment_source.month.to_i).end_of_month
    now = DateTime.now.end_of_month

    exp < now
  end

  def unvalid_for_reuse?(payment_source)
    # some payment gateways use only one of these?  stripe possibly?
    payment_source.nil? || (payment_source.gateway_payment_profile_id.nil? && payment_source.gateway_customer_profile_id.nil?) || payment_source.deleted? || card_expired?(payment_source)
  end

end
