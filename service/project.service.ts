export interface Project {
  id: string;
  title: string;
  summary: string;
  student: string;
  technology: string[];
}

export async function getAllProject(): Promise<Project[]> {
  const url: string = "http://localhost:3000/projects";
  const response: Response = await fetch(url, { cache: "no-store" });
  const projects: Project[] = await response.json();

  return projects;
}

export async function getOneProject(id: string): Promise<Project> {
  const url: string = "http://localhost:3000/projects/" + id;
  const response: Response = await fetch(url,{ cache: "no-store" });
  const project: Project = await response.json();

  return project;
}

export async function saveProject(projectRequest: Project): Promise<Project> {
  const url: string = "http://localhost:3000/projects";
  const request = new Request(url, {
    body: JSON.stringify(projectRequest),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    cache: "no-store",
  });
  const response: Response = await fetch(request);
  const project: Project = await response.json();

  return project;
}

export async function updateProject(projectRequest: Project): Promise<Project> {
  const url: string = "http://localhost:3000/projects/" + projectRequest.id;
  const dto = {
    title: projectRequest.title,
    summary: projectRequest.summary,
    student: projectRequest.student["id"],
    technology: projectRequest["technologies"].map((tec) => tec["id"]),
  };
  const request = new Request(url, {
    body: JSON.stringify(dto),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "PUT",
    cache: "no-store",
  });
  const response: Response = await fetch(request);
  const project: Project = await response.json();

  return project;
}

export async function deleteProject(id: string): Promise<Project> {
  const url: string = "http://localhost:3000/projects/" + id;
  const request = new Request(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "DELETE",
    cache: "no-store",
  });
  const response: Response = await fetch(request);
  const project: Project = await response.json();

  return project;
}
