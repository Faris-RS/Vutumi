import React from "react";

export default function ModalTest() {

  return (
    <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"></div>
              <div className="relative p-0 flex-auto">
                <div className="max-w-4xl flex items-center h-auto  flex-wrap mx-auto lg:my-0">
                 {/* PUT MODAL DECORATION CODE HERE */}
                 
                 {/* MODAL DECORATION CODE END */}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                // onClick={close}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
