import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import OTPInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import firebase from "../../firebase";
import { Toast } from "../../components";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [showVerifyOTP, setShowVerifyOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  const onChangePhone = (value) => {
    setPhone(value);
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSendOTP();
          console.log("Recaptca varified");
        },
        defaultCountry: "PK",
      }
    );
  };

  const toastHandler = () => {
    setToast(Object.assign({}, toast, { show: !toast.show }));
  };

  const onSendOTP = async () => {
    const phoneNumber = "+" + phone;
    setIsLoading(!isLoading);
    if (phone.length <= 3) {
      setToast({
        ...toast,
        show: true,
        type: "error",
        message: "Phone number is required!",
      });
      setIsLoading(!isLoading);
    } else {
      configureCaptcha();
      const appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent");
          setShowVerifyOTP(!showVerifyOTP);
          setToast({
            ...toast,
            show: true,
            type: "success",
            message: "OTP sent successfully!",
          });
          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log("SMS not sent");
          setToast({
            ...toast,
            show: true,
            type: "error",
            message: "Phone number is required!",
          });
        })
        .finally(() => {
          setIsLoading(!isLoading);
        });
    }
  };

  const onVerifyOTP = async () => {
    const code = otp;
    console.log(code);
    setIsLoading();
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        setToast({
          ...toast,
          show: true,
          type: "success",
          message: "OTP verified!",
        });
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        setToast({
          ...toast,
          show: true,
          type: "error",
          message: "OTP verification failed!",
        });
      })
      .finally(() => {
        setIsLoading(!isLoading);
      });
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Toast {...toast} toastHandler={toastHandler} />
      <Grid container sx={{ height: "100%" }} space={4} alignItems="center">
        <Grid
          item
          xs={4}
          sx={{
            backgroundColor: "#1abc9c",
            color: "#ecf0f1",
            padding: "30px",
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Box>
            {!showVerifyOTP ? (
              <>
                <Typography
                  variant="h5"
                  sx={{ marginBottom: "20px", color: "#ecf0f1" }}
                >
                  Login
                </Typography>
                <div id="sign-in-button"></div>
                <Typography sx={{ color: "#ecf0f1" }}>Enter Phone:</Typography>
                <PhoneInput
                  country={"pk"}
                  value={phone}
                  onChange={onChangePhone}
                />
                <Button
                  variant="contained"
                  sx={{
                    marginY: "10px",
                    backgroundColor: "#e74c3c",
                    "&:disabled": {
                      backgroundColor: "#2c3e50",
                      color: "#fff",
                    },
                  }}
                  onClick={onSendOTP}
                  disabled={isLoading}
                >
                  {isLoading && <CircularProgress size={20} color="inherit" />}
                  Send OTP
                </Button>
              </>
            ) : (
              <Box textAlign="center">
                <Typography variant="h5">Check your phone for OTP:</Typography>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  inputStyle={{
                    padding: "10px",
                    fontSize: "20px",
                    borderRadius: "5px",
                    borderColor: "#2c3e50",
                    borderWidth: "1px",
                  }}
                  containerStyle={{
                    justifyContent: "center",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                  renderInput={(props) => <input {...props} />}
                />
                <Button
                  variant="contained"
                  sx={{
                    marginY: "10px",
                    backgroundColor: "#e74c3c",
                    "&:disabled": {
                      backgroundColor: "#2c3e50",
                      color: "#fff",
                    },
                  }}
                  onClick={onVerifyOTP}
                >
                  {isLoading && <CircularProgress size={20} color="inherit" />}
                  Verify OTP
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            backgroundImage: "url('/images/bg.jpg')",
            backgroundSize: "cover",
            height: "100%",
            width: "100%",
          }}
        ></Grid>
      </Grid>
    </Box>
  );
}
