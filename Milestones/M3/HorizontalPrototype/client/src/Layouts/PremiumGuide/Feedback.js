import React, { useState } from "react"; // Needed for AWS since it's using node 16
import "./style.css";
import Button from "../../Components/Button";
import Modal from "../../Components/Modal";

function SubmitFeedback() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <>
      <div class="feedback-container">
        <h2 className="fdbck">Please, leave an honest feedback about the premium guide!</h2>
        <textarea>Write something here ...</textarea>
        <div class="star-wrapper">
          <a href="#" class="fas fa-star s1 checked"></a>
          <a href="#" class="fas fa-star s2"></a>
          <a href="#" class="fas fa-star s3"></a>
          <a href="#" class="fas fa-star s4"></a>
          <a href="#" class="fas fa-star s5"></a>
        </div>{" "}
        <br />
        <br />
        <br />
        <br />
        <br />
        <Button
          onClickEvent={() => setShowSuccessModal(true)}
          content="SUBMIT"
          className="default-button"
        />
      </div>
      {showSuccessModal && (
        <Modal
          title="Success"
          content="You have successfully submitted feedback."
          buttonContent="Close"
          buttonAction={() => setShowSuccessModal(false)}
          showModal={showSuccessModal}
          closeModal={() => setShowSuccessModal(false)}
        />
      )}
    </>
  );
}

export default SubmitFeedback;
