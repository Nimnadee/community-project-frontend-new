"use client";

import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "@/app/components/icons";
import { deleteProject, Project } from "@/service/project.service";
import { useRouter } from "next/navigation";

export default function ProjectTable({ rows, columns, onDelete }) {
  const router = useRouter();

  const getKeyValue = (item, columnKey) => {
    if (columnKey === "action") {
      return (
        <div className={"flex"}>
          <Button
            isIconOnly
            className={"mx-1"}
            onClick={() => handleDelete(item)}
          >
            <DeleteIcon />
          </Button>
          <Button
            isIconOnly
            className={"mx-1"}
            onClick={() => handleEdit(item)}
          >
            <EditIcon />
          </Button>
        </div>
      );
    } else {
      return item[columnKey];
    }
  };

  const handleDelete = async (project: Project) => {
    const res = await deleteProject(project.id);
    onDelete(project.id);
  };

  const handleEdit = (project: Project) => {
    router.push(`/project/${project.id}`);
  };

  return (
    <>
      <Table aria-label="Project table">
        <TableHeader columns={columns}>
          {(column: Column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item: Project) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
