import React, { useEffect, useState } from "react";
import {
  projectLabels,
  saasSprintLabels,
  nextGenSprintLabels,
  sprintTeamLabels,
} from "../constants/ui-constants";
import { NavLink, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoIosArrowDown } from "react-icons/io";

const SForm = () => {
  const [project, setProject] = useState([]);
  const [sprint, setSprint] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [epic, setEpic] = useState("");
  const [item, setItem] = useState("");
  const [issueType, setissueType] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  let payload = {
    project: project,
    sprint: sprint,
    startDate: startDate,
    endDate: endDate,
    username: username,
    password: password,
    epic: epic,
    item: item,
    issuetype: issueType,
  };
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="bg-gray-100 h-[100vh] flex items-center justify-center ">
      <section className="w-[60%]  h-[95vh] flex items-center justify-center">
        <div className="w-[100%] shadow-md rounded flex flex-col justify-around items-center bg-white h-[90vh]">
          <h1 className="text-center text-[2rem] font-semibold p-3">
            Connecture-DRX Dashboard
          </h1>
          <section className="flex items-center gap-[2rem] w-[75%]">
            <div className="flex items-center gap-1 pr-3">
              {/* <label htmlFor="bankname" className="text-[rgb(145,142,143)]">
                User Name
              </label> */}

              <div className="w-[17rem]">
                <input
                  className="border-red-600 rounded-md  py-[0.6rem] pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-[1rem] sm:leading-6 w-[100%] "
                  type="text"
                  pattern="[A-Za-z\s]+"
                  placeholder="User Name"
                  id="username"
                  name="username"
                  value={username}
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* <label htmlFor="bankname" className="text-[rgb(145,142,143)]">
                Password
              </label> */}

              <div className="w-[17rem]">
                <input
                  className="border-red-600 rounded-md  py-[0.6rem] pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-[1rem] sm:leading-6 w-[100%] "
                  type="text"
                  pattern="[A-Za-z\s]+"
                  placeholder=" Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </section>
          <section className="flex items-center ml-9 gap-[2.5rem] w-[80%]">
            <article className="group relative text-[rgb(145,142,143)] p-2  w-[17rem] border border-gray-300 rounded">
              {project.length == 0 && (
                <span className="flex items-center justify-between">
                  {"Projects"} <IoIosArrowDown />
                </span>
              )}
              {project.length !== 0 && (
                <span className="flex items-center justify-between">
                  {project?.map(projec => `'${projec}'`).join(", ")}
                </span>
              )}
              <div className="invisible bg-white border-gray-300 group-hover:visible h-[5rem] w-[17rem] border-[0.02rem] absolute z-10 right-0 -mt-8 rounded pt-4 scrollbar-thin overflow-y-scroll scrollbar-thumb-sky-700 ">
                {projectLabels?.map(pro => (
                  <p key={pro.label} value={pro.value}>
                    {
                      <input
                        className="p-2 ml-2 mr-2"
                        key={pro.label}
                        value={pro.value}
                        type="checkbox"
                        onChange={e => {
                          console.log(pro.value);
                          setProject(p => [...p, pro.value]);
                        }}
                      ></input>
                    }
                    {pro.label}
                  </p>
                ))}
              </div>
            </article>
            <article className="group relative text-[rgb(145,142,143)] p-2  w-[17rem] border border-gray-300 rounded">
              {sprint.length == 0 && (
                <span className="flex items-center justify-between">
                  {"Sprint"} <IoIosArrowDown />
                </span>
              )}
              {sprint.length !== 0 && (
                <span className="flex items-center justify-between">
                  {sprint?.map(projec => `'${projec}'`).join(", ")}
                </span>
              )}
              <div className="invisible bg-white border-gray-300 group-hover:visible h-[5rem] w-[17rem] border-[0.02rem] absolute z-10 right-0 -mt-8 rounded pt-4 scrollbar-thin overflow-y-scroll scrollbar-thumb-sky-700 ">
                {project?.map(item => {
                  if (item === "Next Generation Enrollment") {
                    return nextGenSprintLabels.map(pro => (
                      <p key={pro.label} value={pro.value}>
                        {
                          <input
                            className="p-2 ml-2 mr-2"
                            key={pro.label}
                            value={pro.value}
                            type="checkbox"
                            onChange={e => {
                              setSprint(p => [...p, pro.value]);
                            }}
                          ></input>
                        }
                        {pro.label}
                      </p>
                    ));
                  }
                  if (item === "SaaS SPA") {
                    return saasSprintLabels.map(pro => (
                      <p key={pro.label} value={pro.value}>
                        {
                          <input
                            className="p-2 ml-2 mr-2"
                            key={pro.label}
                            value={pro.value}
                            type="checkbox"
                            onChange={e => {
                              setSprint(p => [...p, pro.value]);
                            }}
                          ></input>
                        }
                        {pro.label}
                      </p>
                    ));
                  }
                })}
              </div>
            </article>
          </section>

          <section className="flex items-center gap-[2.5rem] w-[75%]">
            <div className="flex  items-center text-[rgb(145,142,143)]">
              {/* <label
                htmlFor="bankname"
                className="text-[rgb(145,142,143)] mr-2"
              >
                Purpose
              </label> */}
              <select
                className="border-[1px] p-[0.6rem] border-gray-300 rounded w-[17rem] text-left text-[rgb(145,142,143)]"
                value={item}
                onChange={e => {
                  setItem(e.target.value);
                }}
              >
                <option>Team</option>

                {sprintTeamLabels.map(option => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center  gap-1 mr-4">
              {/* <label htmlFor="bankname" className="text-[rgb(145,142,143)]">
                Password
              </label> */}

              <div className="w-[17rem] ">
                <input
                  className="border-red-600 rounded-md  py-[0.6rem] pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-[1rem] sm:leading-6 w-[100%] "
                  type="text"
                  pattern="[A-Za-z\s]+"
                  placeholder="Epic"
                  id="epic"
                  name="epic"
                  value={epic}
                  onChange={e => {
                    setEpic(e.target.value);
                  }}
                />
              </div>
            </div>
          </section>
          <section className="flex items-center gap-[2.5rem] w-[75%]">
            <div className="w-[17rem] ">
              <input
                className="border-red-600 rounded-md  py-[0.6rem] pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-[1rem] sm:leading-6 w-[100%] "
                type="text"
                pattern="[A-Za-z\s]+"
                placeholder="IssueType"
                id="issuetype"
                name="issuetype"
                value={issueType}
                onChange={e => {
                  setissueType(e.target.value);
                }}
              />
            </div>
          </section>
          <div className="py-1">
            <span className=" pr-4 text-[rgb(145,142,143)]">
              {" "}
              Date Range : From
            </span>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="border-[1px] rounded text-[rgb(145,142,143)] border-gray-400 p-2 ps-3 w-[12rem]"
            ></input>
            <span className="px-[20px] text-[rgb(145,142,143)] ">to</span>
            <input
              type="date"
              onChange={e => setEndDate(e.target.value)}
              value={endDate}
              className="border-[1px] text-[rgb(145,142,143)] rounded border-gray-400 p-2 ps-3 w-[12rem]"
            ></input>
          </div>
          <section className="flex items-center gap-[2.5rem] w-[75%] text-[rgb(145,142,143)]">
            <p>
              <input type="radio" className="mr-3" /> Traceability Matrix
            </p>
          </section>
          {toggle ? (
            <div
              class="shadow-lg w-[25rem] h-[12rem] rounded-lg p-6 mx-auto my-6 max-w-md  absolute top-[100px] right-[400px] z-20 bg-gray-300 text-[#2a2929] mr-2"
              data-aos="fade-down"
            >
              <div class="flex flex-col items-center mb-4 p-2  ">
                <div className="pb-6 flex">
                  <label className="text-[20px] pt-2 pr-2 text-black font-bold ">
                    Date range is not selected !! Would like to continue ?
                  </label>
                </div>
                <section className="mt-3 flex items-center justify-center gap-8">
                  {" "}
                  <button
                    className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={e => {
                      e.preventDefault();

                      // dispatch(
                      //   getApprove({
                      //     approval,
                      //     accountNumber,
                      //   })
                      // ).then(x => {
                      setToggle(t => !t);
                      //   window.location.reload();
                      // });
                    }}
                  >
                    No
                  </button>
                  <button
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={e => {
                      e.preventDefault();
                      navigate("/table-data", {
                        state: { payload },
                      });
                    }}
                  >
                    Yes
                  </button>
                </section>
              </div>
            </div>
          ) : (
            ""
          )}
          <footer className=" flex items-center justify-center gap-[10rem]">
            <button
              className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => {}}
            >
              Reset
            </button>
            <button
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => {
                if (startDate && endDate) {
                  console.log("data------");
                  navigate("/table-data", { state: { payload } });
                } else {
                  setToggle(t => !t);
                }
                console.log(payload);
              }}
            >
              Run
            </button>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default SForm;
