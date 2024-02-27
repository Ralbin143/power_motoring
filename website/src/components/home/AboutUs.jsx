import React from "react";
import about from "../../assets/about-post.jpg";
function AboutUs() {
  const abtImg = {
    with: "100%",
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
          <h4>About Power Motoring</h4>

          <p>
            Welcome to Power Motoring, the brainchild of Nisamudheen ALI, a
            seasoned automobile trainer and enthusiast with over 13 years of
            hands-on experience in the dynamic world of automobiles.
          </p>
          <p>
            Having successfully established the ‘Maruti Products’ app in 2013, a
            testament to our commitment and passion for the automotive industry,
            we are thrilled to present Power Motoring as the next evolution in
            your automotive journey.{" "}
          </p>

          <strong>Our Journey:</strong>

          <p>
            <br /> Power Motoring is born out of a deep love for automobiles and
            a desire to empower enthusiasts, both seasoned and novice, with
            comprehensive insights, knowledge, and a sense of community.
            Nisamudheen ALI, the driving force behind the app, brings a wealth
            of industry experience, making Power Motoring a reliable companion
            for all your automotive endeavors.{" "}
          </p>
          <p>
            <strong>What Sets Us Apart:</strong>{" "}
          </p>
          <p>
            1. Expertise: With over a decade in the automobile industry, we
            bring unparalleled expertise to the table. Our content is curated by
            professionals who understand the nuances of the ever-evolving
            automotive landscape.
          </p>
          <p>
            2. User Community: Power Motoring isn&#39;t just an app; it&#39;s a
            community of 65,000+ users who share a common passion for all things
            automotive. Connect, share, and learn from like-minded individuals
            who appreciate the thrill of the open road.
          </p>
          <p>
            3. Innovation: We believe in staying ahead of the curve. Power
            Motoring is designed to deliver cutting-edge features, keeping you
            informed about the latest trends, technologies, and developments in
            the automotive world.
          </p>
          <p>
            <strong>Our Commitment:</strong>
          </p>
          <p>
            At Power Motoring, our commitment goes beyond providing information;
            it&#39;s about fostering a community where knowledge is shared,
            questions are answered, and the joy of motoring is celebrated. We
            strive to make Power Motoring your go-to source for all things
            automotive.
          </p>
          <p>
            Thank you for being part of our journey. Buckle up as we drive into
            the future of motoring together!
          </p>
          <p> Stay Driven, Nisamudheen ALI Founder, Power Motoring</p>
        </div>
        <div className="col-12 col-md-6" style={abtImg}>
          <img src={about} alt="" style={{ width: "100%" }} />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
