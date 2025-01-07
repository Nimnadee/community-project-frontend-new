"use client";

import React, { useEffect, useState } from "react";

import ProjectTable from "@/app/project/project-table";
import { getAllProject, Project } from "@/service/project.service";
import { ProjectAddPopup } from "@/app/project/project-add-popup";

export default function ProjectPage() {
  const columns: Column[] = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "title",
      label: "TITLE",
    },
    {
      key: "summary",
      label: "SUMMARY",
    },
    {
      key: "action",
      label: "Action",
    },
  ];

  const [rows, setRows]: [Project[], React.Dispatch<(prevRows: Project[]) => Project[]>]= useState([]);

  useEffect(() => {
    getAllProject().then(
        res => {
            console.log("fetch response: ", res);
            setRows((prevRows: Project[]) => res);
        }
    )
  }, []);

  useEffect(() => {
    console.log("useEffect: ", rows);
  }, [rows]);

  const handleSave = (project: Project) => {
    console.log("Trying to save: ", project);
    setRows((prevRows: Project[]) => [...prevRows, project]);
  };

  const handleDelete = (id: string) => {
    console.log("Trying to delete: ", id);
    setRows((prevRows: Project[]) => prevRows.filter((item) => item.id !== id));
  };

  return (
    <>
      <ProjectAddPopup onSave={handleSave} />
      <ProjectTable
        columns={columns}
        rows={rows}
        onDelete={handleDelete}
      />
    </>
  );
}
