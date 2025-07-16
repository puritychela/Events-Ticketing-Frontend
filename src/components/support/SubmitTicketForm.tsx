import { useState } from "react";
import { useCreateTicketMutation } from "../../features/api/supportTicketApi";

const SubmitTicketForm = ({ userId }: { userId: number }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [createTicket] = useCreateTicketMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    await createTicket({ userId, subject, description });
    setSubject("");
    setDescription("");
    alert("Ticket submitted successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        className="input input-bordered w-full"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Describe your issue..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="btn btn-primary w-full" type="submit">
        Submit Ticket
      </button>
    </form>
  );
};

export default SubmitTicketForm;
