'use client';
export const dynamic = 'force-dynamic'

import { useRouter, useParams } from 'next/navigation'
import {getOneProject, Project, updateProject} from "@/service/project.service";
import React, {useEffect, useState} from "react";
import {Input, Textarea} from "@nextui-org/input";
import {title} from "@/app/components/primitives";
import {Button} from "@nextui-org/button";

export default function Page() {

    const router = useRouter();
    const params = useParams();

    const { id } = params;

    const [titleValue, setTitleValue] = useState("");
    const [summeryValue, setSummeryValue] = useState("");
    const [project, setProject]: [Project, React.Dispatch<Project>] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            fetchItem();
        }
    }, [id]);

    const fetchItem = async () => {
        try {
            const project: Project = await getOneProject(id?.toString());
            console.log(project);
            setTitleValue(project.title);
            setSummeryValue(project.summary);
            setProject(project);
            setLoading(false);
        } catch (error) {
            setError('Error fetching item');
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let updatedProject = project;
            updatedProject.title = titleValue;
            updatedProject.summary = summeryValue;
            console.log("trying to update...", updatedProject);
            const res = await updateProject(updatedProject);
            router.push('/project');
        } catch (error) {
            setError('Error updating item');
        }
    };

    const resetForm = () => {
        setTitleValue(project.title);
        setSummeryValue(project.summary);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2 className={title()}>Edit Project ID: {id}</h2>
            <form onSubmit={handleSubmit} className='my-2'>
                <Input
                    label="title"
                    placeholder="Enter title"
                    type="text"
                    value={titleValue}
                    variant="bordered"
                    onValueChange={setTitleValue}
                    isRequired={true}
                />
                <Textarea
                    label="summery"
                    placeholder="Enter summery"
                    type="text"
                    value={summeryValue}
                    variant="bordered"
                    onValueChange={setSummeryValue}
                    isRequired={true}
                />
                <div className='flex my-2'>
                    <Button color="default" variant="flat" className='flex-1' onClick={resetForm}>
                        Reset
                    </Button>
                    <Button color="primary" className='flex-1' type='submit'>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}