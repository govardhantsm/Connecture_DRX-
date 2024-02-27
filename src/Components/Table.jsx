import { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

//   let dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getMd()).then(x => {
//       SetState(x.payload.data);
//     });
//   }, []);

// import React, { useState, useEffect } from "react";
// import { getProjects } from "../apis/api-services.js";
import { useLocation } from "react-router-dom";

import { getProjects } from "../apis/api-server.js";

const Table = ({ username, password, project, sprint }) => {
  let { state } = useLocation();
  // console.log(state.paylaod, "state");
  let [data, setData] = useState([]);
  let [search, setSearch] = useState(null);
  // console.log({ username, password, project, sprint });
  useEffect(() => {
    AOS.init();
  }, []);

  let [key, setKey] = useState();
  let [summary, setSummary] = useState();
  let [status, setStatus] = useState();
  let [linkedKey, setLinkedKey] = useState();
  let [linkedSummary, setLinkedSummary] = useState();
  let [linkedStatus, setLinkedStatus] = useState();
  let [linkedType, setLinkedType] = useState();

  let [key1, setKey1] = useState();
  let [summary1, setSummary1] = useState();
  let [status1, setStatus1] = useState();
  let [linkedKey1, setLinkedKey1] = useState();
  let [linkedSummary1, setLinkedSummary1] = useState();
  let [linkedStatus1, setLinkedStatus1] = useState();
  let [linkedType1, setLinkedType1] = useState();

  const getProjectData = async () => {
    //let user=JSON.parse(localStorage.getItem("user"))
    try {
      //let { data } = await getProjects(project,sprint,user)
      let { data } = await getProjects(
        state?.payload?.username,
        state?.payload?.password,
        state?.payload?.project,
        state?.payload?.sprint
      );
      let dataArray = [];
      data?.issues?.map(issue => {
        let { key, fields } = issue;
        let linkedIssues = fields["issuelinks"] || [];
        let linkedIssueKeyValue = linkedIssues?.filter(
          link => link.type.name === "Relates"
        );

        if (linkedIssueKeyValue.length) {
          for (let i = 0; i < linkedIssueKeyValue.length; i++) {
            dataArray.push({
              key: key,
              summary: fields?.summary,
              status: fields?.status?.name,
              linkedKey: linkedIssueKeyValue[i].inwardIssue?.key || "-",
              linkedSummary:
                linkedIssueKeyValue[i].inwardIssue?.fields.summary || "-",
              linkedStatus:
                linkedIssueKeyValue[i].inwardIssue?.fields.status.name || "-",
              linkedType:
                linkedIssueKeyValue[i].inwardIssue?.fields.issuetype.name ||
                "-",
            });
          }
        } else {
          dataArray.push({
            key: key,
            summary: fields?.summary,
            status: fields?.status?.name,
            linkedKey: "-",
            linkedSummary: "-",
            linkedStatus: "-",
            linkedType: "-",
          });
        }
      });
      let uniqueKeys = new Set();
      let uniqueSummaries = new Set();
      let uniqueStatuses = new Set();
      let uniqueLinkedKeys = new Set();
      let uniqueLinkedSummaries = new Set();
      let uniqueLinkedStatus = new Set();
      let uniqueLinkedType = new Set();
      dataArray.forEach(item => {
        uniqueKeys.add(item.key);
        uniqueSummaries.add(item.summary);
        uniqueStatuses.add(item.status);
        uniqueLinkedKeys.add(item.linkedKey);
        uniqueLinkedSummaries.add(item.linkedSummary);
        uniqueLinkedStatus.add(item.linkedStatus);
        uniqueLinkedType.add(item.linkedType);
      });

      setKey(Array.from(uniqueKeys));
      setSummary(Array.from(uniqueSummaries));
      setStatus(Array.from(uniqueStatuses));
      setLinkedKey(Array.from(uniqueLinkedKeys));
      setLinkedSummary(Array.from(uniqueLinkedSummaries));
      setLinkedStatus(Array.from(uniqueLinkedStatus));
      setLinkedType(Array.from(uniqueLinkedType));

      console.log(dataArray);
      setData(dataArray);
    } catch (error) {
      console.log("🚀 ~ getProjectData ~ error:", error);
    }
  };

  useEffect(() => {
    getProjectData();
  }, [state]);

  return (
    <section data-aos="zoom-in bg-light">
      <div className="mt-4 font-semibold flex items-center justify-center">
        <h2 className="text-center text-[2rem]">Table</h2>
      </div>
      <div className=" flex items-center justify-end px-10">
        <p
          className="text-center border rounded px-2 cursor-pointer"
          onClick={() => {
            setKey1(new Set());
            setLinkedType1(new Set());
            setLinkedStatus1(new Set());
            setLinkedSummary1(new Set());
            setLinkedKey1(new Set());
            setStatus1(new Set());
            setSummary1(new Set());
            setSearch(null);
          }}
        >
          Clear Filter
        </p>
      </div>
      <div className=" text-slate-600 w-[96%] h-[83vh] mx-6 bg-white px-8 text-sm scrollbar-thin overflow-y-scroll scrollbar-thumb-gray-400 scrollbar-track-slate-100  shadow-2xl rounded">
        <table className="w-[100%] text-left border bg-gray-100 mt-3 rounded-md">
          <thead className="border bg-white">
            <tr className="border-b-2 border-black">
              <th className="border p-[10px]">
                Issue Key
                {
                  <select
                    value={key1}
                    onChange={e => {
                      console.log(e.target.value);
                      setKey1(e.target.value);
                      setSearch(
                        data.filter(item => item.key == e.target.value)
                      );
                    }}
                  >
                    <option></option>
                    {key?.map(key => {
                      return (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      );
                    })}
                  </select>
                }
              </th>
              <th className="border p-[10px]">
                Issue Summary
                <select
                  value={summary1}
                  onChange={e => {
                    console.log(e.target.value);
                    setSummary1(e.target.value);
                    setSearch(
                      data.filter(item => item.summary == e.target.value)
                    );
                  }}
                >
                  <option></option>
                  {summary?.map(key => {
                    return (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    );
                  })}
                </select>
              </th>
              <th className="border p-[10px]">
                Issue Status{" "}
                <select
                  value={status1}
                  onChange={e => {
                    console.log(e.target.value);
                    setStatus1(e.target.value);
                    setSearch(
                      data.filter(item => item.status == e.target.value)
                    );
                  }}
                >
                  <option></option>
                  {status?.map(key => {
                    return (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    );
                  })}
                </select>
              </th>
              <th className="border p-[10px]">
                Linked Issue Key{" "}
                <select
                  value={linkedKey1}
                  onChange={e => {
                    console.log(e.target.value);
                    setLinkedKey1(e.target.value);
                    setSearch(
                      data.filter(item => item.linkedKey == e.target.value)
                    );
                  }}
                >
                  <option></option>
                  {linkedKey?.map(key => {
                    return (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    );
                  })}
                </select>
              </th>
              <th className="border p-[10px]">
                Linked Issue Summary
                <select
                  value={linkedSummary1}
                  onChange={e => {
                    console.log(e.target.value);
                    setLinkedSummary1(e.target.value);
                    setSearch(
                      data.filter(item => item.linkedSummary == e.target.value)
                    );
                  }}
                >
                  <option></option>
                  {linkedSummary?.map(key => {
                    return (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    );
                  })}
                </select>
              </th>
              <th className="border p-[10px]">
                Linked Issue Status
                <select
                  value={linkedStatus1}
                  onChange={e => {
                    console.log(e.target.value);
                    setLinkedStatus1(e.target.value);
                    setSearch(
                      data.filter(item => item.linkedStatus == e.target.value)
                    );
                  }}
                >
                  <option></option>
                  {linkedStatus?.map(key => {
                    return (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    );
                  })}
                </select>
              </th>
              <th className="border p-[10px]">
                Linked Issue Type{" "}
                <select
                  value={linkedType1}
                  onChange={e => {
                    console.log(e.target.value);
                    setLinkedType1(e.target.value);

                    setSearch(
                      data.filter(item => item.linkedType == e.target.value)
                    );
                  }}
                >
                  <option></option>
                  {linkedType?.map(key => {
                    return (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    );
                  })}
                </select>
              </th>
            </tr>
          </thead>
          <tbody className="text-left bg-white">
            {/* {data?.issues?.map(issue => {
              let { key, fields } = issue;
              let linkedIssues = fields["issuelinks"] || [];
              let linkedIssueKeyValue = linkedIssues?.filter(
                link => link.type.name === "Relates"
              );
              let tableRows = [];

              if (linkedIssueKeyValue.length) {
                for (let i = 0; i < linkedIssueKeyValue.length; i++) {
                  tableRows.push(
                    <tr key={i} className="odd:bg-gray-100">
                      <td className="p-[10px] border">{key}</td>
                      <td className="p-[10px] border">{fields?.summary}</td>
                      <td className="p-[10px] border">
                        {fields?.status?.name}
                      </td>
                      <td className="p-[10px] border">
                        {linkedIssueKeyValue[i].inwardIssue?.key
                          ? linkedIssueKeyValue[i].inwardIssue?.key
                          : "-"}
                      </td>
                      <td className="p-[10px] border">
                        {linkedIssueKeyValue[i].inwardIssue?.fields.summary
                          ? linkedIssueKeyValue[i].inwardIssue?.fields.summary
                          : "- "}
                      </td>
                      <td className="p-[10px] border">
                        {linkedIssueKeyValue[i].inwardIssue?.fields.status.name
                          ? linkedIssueKeyValue[i].inwardIssue?.fields.status
                              .name
                          : "-"}
                      </td>
                      <td className="p-[10px] border">
                        {linkedIssueKeyValue[i].inwardIssue?.fields.issuetype
                          .name
                          ? linkedIssueKeyValue[i].inwardIssue?.fields.issuetype
                              .name
                          : "-"}
                      </td>
                    </tr>
                  );
                }
                return tableRows;
              } else {
                return (
                  <tr key={key} className="odd:bg-gray-100">
                    <td className="p-[10px] border">{key}</td>
                    <td className="p-[10px] border">{fields?.summary}</td>
                    <td className="p-[10px] border">{fields?.status?.name}</td>
                    <td className="p-[10px] border"></td>
                    <td className="p-[10px] border"></td>
                    <td className="p-[10px] border"></td>
                    <td className="p-[10px] border"></td>
                  </tr>
                );
              }
            })} */}
            {(search == null || search?.length == 0) &&
              data.map((x, index) => {
                return (
                  <tr key={index} className="odd:bg-gray-100">
                    <td className="p-[10px] border">{x.key}</td>
                    <td className="p-[10px] border">{x?.summary}</td>
                    <td className="p-[10px] border">{x?.status}</td>
                    <td className="p-[10px] border">{x.linkedKey}</td>
                    <td className="p-[10px] border">{x.linkedSummary}</td>
                    <td className="p-[10px] border">{x.linkedStatus}</td>
                    <td className="p-[10px] border">{x.linkedType}</td>
                  </tr>
                );
              })}
            {search?.map((x, index) => {
              return (
                <tr key={index} className="odd:bg-gray-100">
                  <td className="p-[10px] border">{x.key}</td>
                  <td className="p-[10px] border">{x?.summary}</td>
                  <td className="p-[10px] border">{x?.status}</td>
                  <td className="p-[10px] border">{x.linkedKey}</td>
                  <td className="p-[10px] border">{x.linkedSummary}</td>
                  <td className="p-[10px] border">{x.linkedStatus}</td>
                  <td className="p-[10px] border">{x.linkedType}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
