import React from 'react';
import ProjectDetails from "../../../components/projectDetails";
import {BASE_URL} from "../../../const";


export async function generateStaticParams() {
    // API'den tüm proje ID'lerini alın
    const res = await fetch(`${BASE_URL}/projects`);

    if (!res.ok) {
        throw new Error('Projeler yüklenirken hata oluştu');
    }

    const projects = await res.json();

    console.log(projects);
    return projects.data.map((project) => ({
        id: project.slug,
    }));
}

export default function Page() {
    return (
        <ProjectDetails/>
    )
}

