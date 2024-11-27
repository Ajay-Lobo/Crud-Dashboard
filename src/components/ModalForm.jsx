import { useState, useEffect } from "react";

const ModalForm = ({ isOpen, onClose, mode, onSubmit, clientData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [rate, setRate] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate);
      setIsActive(clientData.isActive);
    }
  }, [mode, clientData]);

  const handleActiveChange = (e) => {
    setIsActive(e.target.checked);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setJob("");
    setRate("");
    setIsActive(false);
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length <= 3) {
      newErrors.name = "Name must be more than 3 characters.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!job.trim()) {
      newErrors.job = "Job is required.";
    }

    if (!rate || isNaN(rate) || rate <= 0) {
      newErrors.rate = "Rate must be a positive number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        _id: clientData?._id,
        name,
        email,
        job,
        rate,
        isActive,
      });
      onClose();
      resetForm();
    }
  };

  return (
    <dialog id="my_modal_3" className="modal" open={isOpen}>
      <div className="modal-box">
        <h2 className="font-bold text-xl py-4">
          {mode === "edit" ? "Edit Client" : "Add Client"}
        </h2>
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Name input */}
          <div className="my-4">
            <label className="input input-bordered mr-4 flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                placeholder="Daisy"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {errors.name && <p className="text-error">{errors.name}</p>}
          </div>

          {/* Email input */}
          <div className="my-4">
            <label className="input input-bordered mr-4 flex items-center gap-2">
              Email
              <input
                type="text"
                className="grow"
                placeholder="daisy@site.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {errors.email && <p className="text-error">{errors.email}</p>}
          </div>

          {/* Job input */}
          <div className="my-4">
            <label className="input input-bordered mr-4 flex items-center gap-2">
              Job
              <input
                type="text"
                className="grow"
                placeholder="Daisy"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </label>
            {errors.job && <p className="text-error">{errors.job}</p>}
          </div>

          {/* Rate and Active Checkbox */}
          <div className="flex items-center gap-2 my-4">
            <div className="flex-grow">
              <label className="input input-bordered flex items-center gap-2">
                Rate
                <input
                  type="number"
                  className="grow"
                  placeholder="4.8"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </label>
              {errors.rate && <p className="text-error">{errors.rate}</p>}
            </div>

            <label className="label cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={handleActiveChange}
                className="checkbox"
              />
              <span className="label-text ml-2">Active</span>
            </label>
          </div>

          {/* Submit button */}
          <div className="modal-action">
            <button type="submit" className="btn btn-success">
              {mode === "edit" ? "Save Changes" : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ModalForm;
