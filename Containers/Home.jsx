import React from "react";
import Aside from "../Components/aside";
import Header from "../Components/Header";

export default function Home() {
  const [menu, setMenu] = React.useState(false);

  return (
    <>
      <Header menu={menu} setMenu={setMenu} />
      <div className="content flex">
        {menu && <Aside menu={menu} />}
        <div className="flex justify-center items-center max-w-screen max-h-screen overflow-hidden bg-red-500">
          <div className="Boxes relative top-18 w-full h-screen flex justify-center items-start gap-5 flex-wrap">
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                className="box box w-72 h-50 bg-gray-500 rounded-md "
              >
                <div className="text-white flex justify-center items-center w-full h-full">
                  Box {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
