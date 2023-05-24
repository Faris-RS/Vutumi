import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import modalStore from "../../store/modalStore";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { chatUrl } from "../../api/api";
import {
  allUsersRoute,
  host,
  recieveMessageRoute,
  sendMessageRoute,
} from "../../api/chatRoutes";
import { io } from "socket.io-client";
import animationStore from "../../store/animationStore";
import Loading from "../loading/Loading";
import { IoMdSend } from "react-icons/io";

export default function Chatbar() {
  const navigate = useNavigate();
  const socket = useRef();
  const scrollRef = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState();
  const [chatPerson, setChatPerson] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState("");

  const {
    setIsActive,
    isActive,
    showChat,
    setShowChat,
    setShowSidebar,
    showSidebar,
    showSingleChat,
    setSingleChat,
  } = modalStore();

  const { isHovered, setIsHovered } = animationStore();

  const close = () => {
    setShowSidebar(!showSidebar);
    setShowChat(!showChat);
    setIsActive(!isActive);
  };

  // const selectChat = () => {
  //   setShowChat(!showChat);
  //   setSingleChat(!showSingleChat);
  // };

  const backToChat = () => {
    setCurrentChat(null);
    setChatPerson(null);
    setMessages([]);
    setLoading(true);
  };

  useEffect(() => {
    const token = { token: localStorage.getItem("userToken") };
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    } else {
      axios.post(`${chatUrl}userData`, token).then((response) => {
        setCurrentUser(response.data.data);
      });
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      axios.get(`${allUsersRoute}/${currentUser._id}`).then((response) => {
        setContacts(response.data);
      });
    }
  }, [currentUser]);

  const handleChatChange = (id, firstName, lastName) => {
    setCurrentChat(id, lastName);
    setChatPerson(firstName);
  };

  useEffect(() => {
    console.log("current chat");
    console.log(chatPerson);
  }, [chatPerson]);

  //

  // useEffect(() => {
  //   const getDetails = () => {
  //     const token = { token: localStorage.getItem("userToken") };
  //     axios.post(`${chatUrl}userData`, token).then((response) => {
  //       setData(response.data.data);
  //     });
  //   };
  //   getDetails();
  // }, []);

  // useEffect(()=>{
  //   console.log(currentUser);
  // },[currentUser])

  useEffect(() => {
    if (currentChat !== null) {
      axios
        .post(recieveMessageRoute, {
          from: currentUser._id,
          to: currentChat,
        })
        .then((response) => {
          setMessages(response.data);
          setLoading(false);
          // console.log(response.data);
        });
    }
  }, [currentChat]);

  useEffect(() => {
    if (currentChat !== null) {
      const getCurrentChat = async () => {
        if (currentChat) {
          currentUser._id;
          localStorage.setItem("test", currentUser._id);
        }
      };
      getCurrentChat();
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    // const data = await JSON.parse(
    //   localStorage.getItem('chatToken')
    // );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  // console.log(messages);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <>
      {currentChat === null ? (
        <>
          <div
            className={`top-0 right-0 w-full sm:w-[35vw] bg-blue-600  p-10 md:pl-20 sm:pl-0 text-white fixed h-full z-40  ease-in-out duration-300 fixed ${
              showChat ? "translate-x-0 " : "translate-x-full"
            }`}
          >
            <div className="flex items-center mt-10">
              <h3
                className="text-4xl font-semibold text-white cursor-pointer hover:scale-125 duration-300 ease-in-out"
                onClick={close}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </h3>
              <h3 className="ml-10 text-2xl font-semibold text-white">Chat</h3>
              <br />
            </div>
            {/* <h3 onClick={selectChat}>Test</h3> */}
            <ul>
              {
                <>
                  {contacts.map((result) => (
                    <div key={result._id} className="bg-blue-600">
                      <h3
                        className={`mt-10 text-3xl font-semibold text-white cursor-pointer inline-block duration-300 ease-in-out ${
                          isHovered ? "hover:underline" : ""
                        }`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() =>
                          handleChatChange(
                            result._id,
                            result.firstName,
                            result.lastName
                          )
                        }
                      >
                        {result.firstName} {result.lastName}
                      </h3>
                    </div>
                  ))}
                </>
              }
            </ul>
          </div>
        </>
      ) : (
        <>
          <div
            className={`top-0 right-0 w-full sm:w-[35vw] bg-blue-600  p-10 md:pl-20 sm:pl-0 text-white fixed h-full z-40  ease-in-out duration-300 fixed ${
              showChat ? "translate-x-0 " : "translate-x-full"
            }`}
          >
            <div className="flex items-center mt-10">
              <h3
                className="text-4xl font-semibold text-white cursor-pointer hover:scale-125 duration-300 ease-in-out"
                onClick={backToChat}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </h3>
              <h3 className="ml-10 text-2xl font-semibold text-white">
                {chatPerson}
              </h3>
              <br />
            </div>
            {loading ? (
              <Loading />
            ) : (
              <>
                <Container>
                  <div className="chat-header"></div>
                  <div className="chat-messages">
                    {messages.map((message) => {
                      return (
                        <div ref={scrollRef} key={uuidv4()}>
                          <div
                            className={`message ${
                              message.fromSelf ? "sended" : "recieved"
                            }`}
                          >
                            <div className="content ">
                              <p>{message.message}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Container>
                <Container2>
                  <div className="button-container"></div>
                  <form
                    className="input-container"
                    onSubmit={(event) => sendChat(event)}
                  >
                    <input
                      type="text"
                      placeholder="type your message here"
                      onChange={(e) => setMsg(e.target.value)}
                      value={msg}
                    />
                    <button type="submit">
                      <IoMdSend />
                    </button>
                  </form>
                </Container2>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: white;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: blue;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: indigo;
      }
    }
  }
`;

const Container2 = styled.div`
  display: grid;
  align-items: center;
  position: absolute;
  bottom: 0;
  margin-bottom: 25px;
  width: 80%;
  background-color: transparent;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    }
  }
  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: transparent;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border-width: 2px
      font-size: 1.2rem;
      margin-left: -10px

      &::selection {
        background-color: green;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: blue;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
