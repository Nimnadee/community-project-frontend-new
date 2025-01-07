"use client";

import React, {useState} from 'react';
import {Button} from "@nextui-org/button";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {Input, Textarea} from "@nextui-org/input";
import {saveProject} from "@/service/project.service";

export function ProjectAddPopup({ onSave}) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [titleValue, setTitleValue] = useState("");
    const [summeryValue, setSummeryValue] = useState("");

    const onSubmit = async () => {
        const res = await saveProject({
            id: "",
            title: titleValue,
            summary: summeryValue,
            student: "665621b3b07edc6459bee227",
            technology: ["66562241b07edc6459bee22c", "66562257b07edc6459bee230"],
        })
        onSave(res);
        clearForm();
        onClose();
    };

    const clearForm = () => {
        setTitleValue("");
        setSummeryValue("");
    };


    return (
        <>
            <Button  onPress={onOpen}>Add New Project</Button>
            <Modal
                isOpen={isOpen}
                placement="top-center"
                onClose={onClose}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Add Project
                        </ModalHeader>
                        <ModalBody>
                            <Input
                                label="title"
                                placeholder="Enter title"
                                type="text"
                                value={titleValue}
                                variant="bordered"
                                onValueChange={setTitleValue}
                            />
                            <Textarea
                                label="summery"
                                placeholder="Enter summery"
                                type="text"
                                value={summeryValue}
                                variant="bordered"
                                onValueChange={setSummeryValue}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" type="submit" onPress={onSubmit}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
}