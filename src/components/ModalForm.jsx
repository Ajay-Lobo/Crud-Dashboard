import { useState, useEffect } from "react";

const ModalForm = ({ isOpen, onClose, mode, onSubmit, clientData }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [rate, setRate] = useState("");
  const [isActive, setIsActive] = useState(false);

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
  };

  return (
    <dialog id="my_modal_3" className="modal" open={isOpen}>
      <div className="modal-box">
        <h2 className="font-bold text-xl py-4">
          {mode === "edit" ? "Edit Client" : "Add Client"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
           onSubmit({ _id: clientData?._id, name, email, job, rate, isActive });
            onClose();
            resetForm(); 
          }}
        >
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>

          {/* Name input */}
          <label className="input input-bordered mr-4 my-4 flex items-center gap-2">
            Name
            <input
              type="text"
              className="grow"
              placeholder="Daisy"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          {/* Email input */}
          <label className="input input-bordered mr-4 my-4 flex items-center gap-2">
            Email
            <input
              type="text"
              className="grow"
              placeholder="daisy@site.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* Job input */}
          <label className="input input-bordered mr-4 my-4 flex items-center gap-2">
            Job
            <input
              type="text"
              className="grow"
              placeholder="Daisy"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </label>

          {/* Rate and Active Checkbox */}
          <div className="flex mr-4 my-4 items-center gap-2">
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
          <button type="submit" className="btn btn-success">
            {mode === "edit" ? "Save Changes" : "Add Client"}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalForm;
