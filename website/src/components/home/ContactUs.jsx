import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { INSTANCE } from "../../const/ApiHeader";
import { addFeedback } from "../../const/ApiConst";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ContactUs() {
  const [custName, setCustName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const Navigate = useNavigate();

  const saveFeedback = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const data = {
        custName: custName,
        contactNo: contactNo,
        email: email,
        feedback: feedback,
      };
      await INSTANCE.post(addFeedback, data);
      Navigate(-1);
    } catch (error) {
      console.error("Error submitting feedback:", error); // Log any errors
    }
  };

  return (
    <div className="">
      <div
        className="heading-contact-us pt-5"
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3>ContactUs</h3>
      </div>
      <div
        className="row"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "100px",
        }}
      >
        <div
          className="contect-contact-us"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <div className="d-flex flex-column">
            <strong style={{ fontSize: "25px" }}>Our Address</strong>
            <strong>Nisamudheen Ali</strong>
            <span>Padinjarechalil,</span>
            <span>Market P.O,</span>
            <span>Muvattupuzha,</span>
            <span>admin@powermotoring.com</span>
            <span>+91 8075 44 1550 (Whatsapp only)</span>
          </div>
          <div>
            <strong style={{ fontSize: "25px" }}>Write Us</strong>
            <Form
              onSubmit={(e) => saveFeedback(e)}
              style={{
                border: "1px solid black",
                padding: "50px 40px",
                width: "500px",
              }}
            >
              <Box
                sx={{
                  "& > :not(style)": { m: 1, width: "47ch" },
                }}
                noValidate
                autoComplete="off"
                fullWidth
              >
                <TextField
                  id="outlined-basic"
                  label="Full Name"
                  variant="outlined"
                  required={true}
                  inputProps={{ maxLength: 40 }}
                  onChange={(e) => setCustName(e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="E-mail *"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                  inputProps={{ maxLength: 60 }}
                />
                <TextField
                  id="outlined-basic"
                  label="Mobile No. *"
                  variant="outlined"
                  type="number"
                  onChange={(e) => setContactNo(e.target.value)}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 10);
                  }}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Please type your query *"
                  multiline
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  inputProps={{ maxLength: 160 }}
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    style={{
                      background: "green",
                      color: "white",
                      width: "100px",
                    }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </Box>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
