import React from 'react';
import {BASE_URL} from "../../../const";
import ProjectDetails from "../../../components/projectDetails";
// import { notFound } from 'next/navigation'; // No longer needed here

export const dynamicParams = false;

export async function generateStaticParams() {
    console.log("[generateStaticParams] Starting..."); // Log start

   let result = []

    for (let i = 0; i < 1000; i++) {
            result.push({
                id: i.toString(),
            })
    }
    return result;
}


// Add generateMetadata function
export async function generateMetadata({params}) {
    const slug = params.id;
    // Simple title generation from slug (replace hyphens, capitalize)
    const projectTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return {
        title: `${projectTitle} - Projektdetails`, // Template from layout adds " | Baku Bau GmbH"
        description: `Details zum Bauprojekt ${projectTitle}, durchgeführt von Baku Bau GmbH. Erfahren Sie mehr über unsere Arbeit.`,
        // Optional: Add keywords based on project if possible
        // keywords: [projectTitle, "Bauprojekt", "Baku Bau", ...]
        // You could potentially fetch minimal project data here just for metadata,
        // but since the page fetches client-side, keep this simple for build.
        openGraph: {
            // Override title and description for sharing this specific project
            title: `${projectTitle} - Projektdetails | Baku Bau GmbH`,
            description: `Details zum Bauprojekt ${projectTitle}, durchgeführt von Baku Bau GmbH.`,
            // You might want a specific image for each project if available
            // images: [ { url: project.thumbnail || '/og-image.png' } ],
        },
        twitter: {
            title: `${projectTitle} - Projektdetails | Baku Bau GmbH`,
            description: `Details zum Bauprojekt ${projectTitle}, durchgeführt von Baku Bau GmbH.`,
            // images: [ project.thumbnail || '/twitter-image.png' ],
        }
    };
}

// Remove the server-side getProject function
/*
async function getProject(slug) {
  // ... fetch logic ...
}
*/

// This component is now simple, just passes the slug
export default function Page({params}) { // Accept params
    // params.id will contain the slug because the folder is [id]
    const slug = params.id;

    // Pass slug to the client component
    return (
        <ProjectDetails slug={slug}/>
    )
}

