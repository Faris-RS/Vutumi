import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import modalStore from "../../store/modalStore";

export default function SingleChat() {
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

  const back = () => {
    setSingleChat(!showSingleChat);
    setShowChat(!showChat);
  };

  return (
    <>
      <div
        className={`top-0 right-0 w-full sm:w-[35vw] bg-blue-600  p-10 md:pl-20 sm:pl-0 text-white fixed h-full z-40  ease-in-out duration-300 fixed ${
          showChat ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className="flex items-center mt-10">
          <h3
            className="text-4xl font-semibold text-white cursor-pointer hover:scale-125 duration-300 ease-in-out"
            onClick={back}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </h3>
          <h3 className="ml-10 text-2xl font-semibold text-white">Chat</h3>
        </div>
      </div>
    </>
  );
}
