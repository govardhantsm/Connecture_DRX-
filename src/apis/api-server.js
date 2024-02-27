import axios from "axios";

export const getProjects = (username, password, project, sprint) => {
  console.log(username, password, project, sprint);
  const displayProjects = project
    ? project?.map(projec => `'${projec}'`).join(" or ")
    : undefined;
  console.log(displayProjects);
  const displaysprint = sprint
    ? sprint?.map(projec => `'${projec}'`).join(" or ")
    : undefined;
  console.log(displaysprint);

  //    return Axios().post(`/`, {
  //     //"jql": `project= '${project}' and sprint= '${sprint}' and created >= -70d order by created DESC`
  //      "jql": "project= 'Next Generation Enrollment' and sprint= 'NGE Sprint 2' and created >= -70d order by created DESC"
  // })//,{headers:header})//"iahmed@connecture.com"
  //
  return axios.post(
    `http://localhost:8000`,
    {
      jql: `project= ${displayProjects} and sprint= ${displaysprint} and created >= -70d order by created DESC`,
    },
    {
      headers: {
        "Content-Type": "application/json",
        username: username,
        password: password,
      },
    }
  );
};
