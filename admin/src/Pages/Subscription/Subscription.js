import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { instance } from "../../Const/ApiHeader";
import { ADD_SUBSCRIPTION, ALL_SUBSCRIPTION } from "../../Const/ApiConst";
import { useEffect } from "react";

function Subscription() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [subscriptionsName, setSubscriptionsName] = useState("");
  const [subscriptionAmount, setSubscriptionAmount] = useState(0);
  const [planValidity, setPlanValidity] = useState("");
  const [subsData, setSubsData] = useState([]);

  const saveSubscription = async () => {
    const data = {
      plan_name: subscriptionsName,
      planValidity: planValidity,
      subscriptionAmount,
    };

    const response = await instance.post(ADD_SUBSCRIPTION, data);

    if (response) {
    }
    loadSubscriptions();
    handleClose();
  };

  const loadSubscriptions = async () => {
    const data = await instance.get(ALL_SUBSCRIPTION);

    if (data) {
      setSubsData(data.data);
    }
  };
  useEffect(() => {
    loadSubscriptions();
  }, []);

  console.log(subsData);

  return (
    <div>
      <Button onClick={handleShow}>Add Subscription</Button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Subscription Name</th>
            <th>Validy</th>
            <th className="text-end">Subscription Amount</th>
            <th className="text-end">Payment Gateway Charge</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subsData.map((res, i) => (
            <tr>
              <td>{res.plan_name}</td>
              <td>{res.planValidity} Month(s)</td>
              <td className="text-end">₹ {res.subscriptionAmount}</td>
              <td className="text-end">
                ₹ {(parseFloat(res.subscriptionAmount) / 0.98).toFixed(2)}{" "}
              </td>
              <td>EDIT</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new Subscriptions</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Subscription Name"
            onChange={(e) => setSubscriptionsName(e.target.value)}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Validy"
            onChange={(e) => setPlanValidity(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Subscription Amount"
            onChange={(e) => setSubscriptionAmount(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => saveSubscription()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Subscription;
