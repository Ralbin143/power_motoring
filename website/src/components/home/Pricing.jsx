import React from "react";

function Pricing() {
  return (
    <div className="container pt-4">
      <h4>Pricing Policy for Power Motoring</h4>
      <p>
        <strong> 1. Subscription Plans</strong>
      </p>
      <p> Power Motoring offers three subscription plans: </p>
      <p>Silver Plan: Rs 50* per month </p>
      <p>Gold Plan: Rs 300* for 6 months </p>
      <p>Platinum Plan: Rs 500* for 1 year </p>
      <p>
        <strong>2. Introductory Price</strong>{" "}
      </p>
      <p>
        The above-mentioned prices are introductory prices available till
        31-may-2024. After the introductory period, the prices may be subject to
        change. Users will be notified of any changes to the subscription prices
        and features before their next billing cycle.
      </p>
      <p>
        <strong>3. Features by Subscription Tier</strong>{" "}
      </p>
      <p>
        Silver Plan (Rs 50* per month):
        <ul>
          <li>Ad-free experience within the app.</li>
          <li>Advanced search functionality.</li>
        </ul>
      </p>
      <p>
        Gold Plan (Rs 300* for 6 months):
        <ul>
          <li>Ad-free experience within the app.</li>
          <li> Enhanced search functionality.</li>
        </ul>
      </p>
      <p>
        Platinum Plan (Rs 500* for 1 year):
        <ul>
          <li>Ad-free experience within the app.</li>
          <li> Enhanced search functionality.</li>
        </ul>
      </p>
      <p>
        <strong>4. Payment Payment</strong>
      </p>
      <p>
        for subscriptions will be processed through the payment gateway which is
        specified in the app. Users are required to provide accurate and
        up-to-date payment information.
      </p>
      <p>
        <strong>5. Billing</strong>{" "}
      </p>
      <p>
        Users can select the plan which is required for them. It is the
        user&#39;s responsibility to ensure that their payment information is
        accurate and up to date.
      </p>
      <p>
        <strong>6. Price Changes </strong>
      </p>
      <p>
        Power Motoring reserves the right to change subscription prices, plans
        or features after the introductory period. Users will be informed of any
        changes to subscription prices and features before their next billing
        cycle.
      </p>
      <p>
        <strong>7. Refunds</strong>{" "}
      </p>
      <p>
        As subscription cancellation is not available, Power Motoring does not
        provide refunds for any reason, including but not limited to unused
        portions of the subscription period.
      </p>
      <p>
        <strong>8. Contact Information </strong>
      </p>
      <p>
        For any questions or concerns regarding subscriptions or the pricing
        policy, users can contact Power Motoring at admin@powermotoring.com
      </p>
      <p>
        <strong>9. Changes to Pricing Policy </strong>
      </p>
      <p>
        Power Motoring reserves the right to update or modify this pricing
        policy at any time. Users will be notified of any changes through the
        app or other appropriate channels.
      </p>
      <p>
        <strong>10. Payment Gateway charges and GST</strong>
      </p>
      <p>
        All the prices are excluding payment gateway charges and GST, so the
        user has to pay the Payment Gateway charges and GST (if applicable) in
        addition to the subscription amount.
      </p>
      <p>Price Chart: (till 31-May-2024) </p>
      <p>
        <table className="table">
          <thead>
            <tr>
              <th>Subscription Plan</th>
              <th>Duration</th>
              <th>Price (Introductory)</th>

              <th>Features</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Silver</td>
              <td>1 month</td>
              <td>Rs 50*</td>

              <td>Ad-free, Advanced Search.</td>
            </tr>
            <tr>
              <td>Gold</td>
              <td>6 months</td>
              <td>Rs 300*</td>

              <td>Ad-free, Advanced Search.</td>
            </tr>
            <tr>
              <td>Platinum</td>
              <td>1 year</td>
              <td>Rs 500*</td>

              <td>Ad-free, Advanced Search.</td>
            </tr>
          </tbody>
        </table>
      </p>
      <span>
        *Payment gateway charges and gst are not included, all the users have to
        pay the amount
      </span>
    </div>
  );
}

export default Pricing;
