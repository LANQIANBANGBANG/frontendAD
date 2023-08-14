import styled from "styled-components";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hw2fl8j",
        "template_tleqnfp",
        form.current,
        "iYmv_wXxFQGwnlzX3"
      )
      .then(
        (result) => {
          console.log("message-sent");
          toast.success("Thanks for contact! We will get back to you soon!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <ToastContainer />
      <StyledContactForm>
        <form ref={form} onSubmit={sendEmail}>
          <h5 className="text-center">
            <b>Contact Us</b>
          </h5>
          <label>Name</label>
          <input type="text" name="to_name" />
          <label>Email</label>
          <input type="email" name="from_name" />
          <label>Message</label>
          <textarea name="my_message" />
          <input type="submit" value="Send" />
        </form>
      </StyledContactForm>
    </>
  );
};

//Styles
const StyledContactForm = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  font-size: 16px;
  form {
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-size: 16px;

    input,
    textarea {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-height: 100px;
      min-height: 100px;
    }
  }

  label {
    margin-top: 1rem;
  }

  input[type="submit"] {
    margin-top: 2rem;
    cursor: pointer;
    background: rgb(249, 185, 14);
  }
`;
