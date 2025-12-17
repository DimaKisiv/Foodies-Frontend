import React, { useEffect, useState } from "react";
import css from "./SignInModal.module.css";
import Modal from "../Modal.jsx";
import clsx from "clsx";
import { login } from "../../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import Icon from "../../shared/Icon/Icon";
import { toast } from "react-hot-toast";

function SignInModal({
  isOpen,
  onClose,
  defaultEmail = "",
  onSwitchToSignUp,
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [submitError, setSubmitError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    if (!isOpen) return;
    setSubmitError(null);
    setFormData({ email: defaultEmail || "", password: "" });
    setTouched({ email: false, password: false });
    setShowPassword(false);
  }, [isOpen, defaultEmail]);

  const validate = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (submitError) setSubmitError(null);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitError(null);

    try {
      await dispatch(login(formData)).unwrap();
      setFormData({ email: "", password: "" });
      setTouched({ email: false, password: false });
      setShowPassword(false);
      onClose?.();
    } catch (err) {
      const status = err?.status ?? null;
      const message = err?.message ?? err;

      if (status === 401) {
        setSubmitError("Invalid email or password");
        return;
      }

      if (status === 400) {
        setSubmitError(message || "Validation error");
        return;
      }

      toast.error(message || "Server error. Please try again later");
    }
  };

  const handleClose = () => {
    setSubmitError(null);
    setFormData({ email: "", password: "" });
    setTouched({ email: false, password: false });
    setShowPassword(false);
    onClose?.();
  };

  return (
    <Modal
      className={css["signIn-modal"]}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <div className={css["signIn-modal-container"]}>
        <p className={css["modal-title"]}>Sign In</p>

        <form className={css["modal-form"]} onSubmit={handleSubmit} noValidate>
          <div className={css["form-group"]}>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched.email && errors.email && (
              <span className={css["error"]}>{errors.email}</span>
            )}
          </div>

          <div className={css["form-group"]}>
            <div className={css["password-wrapper"]}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password*"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <button
                type="button"
                className={css["show-password"]}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Icon
                    id="icon-eye-on"
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                ) : (
                  <Icon
                    id="icon-eye-off"
                    width={20}
                    height={20}
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className={css["error"]}>{errors.password}</span>
            )}
          </div>
          <div className={css["modal-actions"]}>
            {submitError && (
              <span className={css["submit-error"]}>{submitError}</span>
            )}
            <button
              type="submit"
              className={clsx(css["modal-btn"], {
                [css["modal-btn-disabled"]]: !isValid,
              })}
              disabled={!isValid}
            >
              Sign In
            </button>
          </div>
        </form>

        <p className={css["modal-info-text"]}>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => onSwitchToSignUp?.(formData.email)}
          >
            Create an account
          </button>
        </p>
      </div>
    </Modal>
  );
}

export default SignInModal;
