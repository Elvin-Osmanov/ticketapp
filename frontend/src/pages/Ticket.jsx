import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, createNote, reset } from "../features/notes/noteSlice";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";

const Ticket = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ticket, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const onNoteSubmit = (e) => {
    e.preventDefault();

    dispatch(createNote({ noteText, ticketId }));

    closeModal();
  };

  useEffect(() => {
    if (isError) return toast.error(message);

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId, dispatch]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket closed");
    navigate("/tickets");
  };
  if (isLoading || notesIsLoading) return <Spinner />;
  if (isError) return <h3>Something went wrong</h3>;
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url={"/tickets"} />
        <h2>
          Ticket ID: {ticket._id}{" "}
          <span className={`status status-${ticket.status}`}></span>
        </h2>
        <h3>
          Data submitted: {new Date(ticket.createdAt).toLocaleString("en-UK")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket.status !== "Close" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}
      <Modal
        isOpen={isOpen}
        omRequestClose={closeModal}
        contentLabel={"Add Note"}
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note Text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== "closed" && (
        <button
          onClick={onTicketClose}
          className="btn btn-block btn-danger"
        ></button>
      )}
    </div>
  );
};

export default Ticket;
